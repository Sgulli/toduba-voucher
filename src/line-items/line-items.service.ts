import { type LineItem } from "@prisma/client";
import { type ILineItemService } from "./interfaces/line-item.interface";
import { prisma } from "../db/prisma";
import { kvKeyFn } from "../utils/kv-key-fn";
import { kv } from "../config";

export const lineItemService: ILineItemService = {
  create: async (data) => {
    const lineItem = await prisma.lineItem.create({
      data,
    });
    await kv.del(kvKeyFn("line-items"));
    return lineItem;
  },
  get: async (id: string) => {
    const cached = await kv.get<LineItem>(kvKeyFn("line-items", id));
    if (cached) return cached;
    const lineItem = await prisma.lineItem.findUniqueOrThrow({
      where: { id },
    });
    await kv.set(kvKeyFn("line-items"), lineItem);
    return lineItem;
  },
  getAll: async ({ orderId }: { orderId: string }) => {
    const cached = await kv.get<LineItem[]>(kvKeyFn("line-items", orderId));
    if (cached && cached.length > 0) return cached;
    const lineItems = await prisma.lineItem.findMany({
      where: {
        orderId,
      },
    });
    await kv.set(kvKeyFn("line-items", orderId), lineItems);
    return lineItems;
  },
  update: async (id: string, data: LineItem) => {
    const lineItem = await prisma.lineItem.update({
      where: { id },
      data,
    });
    await Promise.all([
      kv.set(kvKeyFn("line-items", lineItem.id), lineItem),
      kv.del(kvKeyFn("line-items")),
    ]);
    return lineItem;
  },
  delete: async (id: string) => {
    const lineItem = await prisma.lineItem.delete({
      where: { id },
    });
    await Promise.all([
      kv.del(kvKeyFn("line-items", lineItem.id)),
      kv.del(kvKeyFn("line-items")),
    ]);
    return lineItem;
  },
  getByOrderId: async (orderId: string) => {
    const cached = await kv.get<LineItem>(kvKeyFn("line-items", orderId));
    if (cached) return cached;
    const lineItem = await prisma.lineItem.findFirst({
      where: { orderId },
    });
    if (!lineItem) return null;
    await kv.set(kvKeyFn("line-items", lineItem.id), lineItem);
    return lineItem;
  },
};
