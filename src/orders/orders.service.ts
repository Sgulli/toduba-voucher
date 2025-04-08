import { type Order, OrderStatus } from "@prisma/client";
import { prisma } from "../db/prisma";
import { type CreateOrder, type UpdateOrder } from "./schema";
import { type IOrderService } from "./interfaces/order.interface";
import { NotFoundError, ValidationError } from "../utils/errors";
import { usersService } from "../users/users.service";
import { getRandomValues } from "crypto";
import { MESSAGES } from "../utils/message";
import { kv } from "../config";
import { createLineItemsData } from "./utils/create-line-item-data";
import { kvKeyFn } from "../utils/kv-key-fn";

export const ordersService: IOrderService = {
  create: async (userId: string, data: CreateOrder) => {
    const { lineItems, ...rest } = data;

    const user = await usersService.get(userId);
    if (!user) throw new NotFoundError(MESSAGES.USER.NOT_FOUND);

    const lineItemsData = await createLineItemsData(lineItems);
    const total = lineItemsData.reduce(
      (acc, lineItem) => acc + lineItem.amount,
      0
    );

    const order = await prisma.order.create({
      data: {
        ...rest,
        total,
        userId,
        status: OrderStatus.NEW,
        code: ordersService.generateCode(),
        lineItems: {
          create: lineItemsData,
        },
      },
    });
    await kv.del(kvKeyFn("orders"));
    return order;
  },
  get: async (id: string) => {
    const cached = await kv.get<Order>(kvKeyFn("orders", id));
    if (cached) return cached;
    const order = await prisma.order.findUniqueOrThrow({
      where: { id },
      include: {
        lineItems: true,
      },
    });
    await kv.set(kvKeyFn("orders", order.id), order);
    return order;
  },
  getAll: async (userId: string) => {
    const cached = await kv.get<Order[]>(kvKeyFn("orders"));
    if (cached && cached.length > 0) return cached;
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        lineItems: true,
      },
    });
    await kv.set(kvKeyFn("orders"), orders);
    return orders;
  },
  paginate: async (userId: string, page: number, limit: number) => {
    return prisma.order.paginate({
      pagination: {
        limit,
        page,
      },
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        lineItems: true,
      },
    });
  },
  update: async (id: string, data: UpdateOrder) => {
    const existingOrder = await ordersService.get(id);
    if (!existingOrder) {
      throw new ValidationError(MESSAGES.ORDER.NOT_FOUND);
    }
    const { status } = data;

    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
      },
    });
    await Promise.all([
      kv.set(kvKeyFn("orders", id), order),
      kv.del(kvKeyFn("orders")),
    ]);
    return order;
  },
  delete: async (id: string) => {
    const existingOrder = await ordersService.get(id);
    if (!existingOrder) {
      throw new NotFoundError(MESSAGES.ORDER.NOT_FOUND);
    }
    const order = await prisma.order.delete({
      where: { id },
    });
    await Promise.all([
      kv.del(kvKeyFn("orders")),
      kv.del(kvKeyFn("orders", id)),
    ]);
    return order;
  },
  generateCode: () => {
    const INIT_CODE = "ORD";
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomPart = getRandomValues(new Uint32Array(2))
      .reduce((acc, val) => acc + val.toString(36).toUpperCase(), "")
      .slice(0, 6);
    return `${INIT_CODE}-${timestamp}-${randomPart}`;
  },
};
