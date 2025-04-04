import { OrderStatus, PriceCurrency } from "@prisma/client";
import { prisma } from "../db/prisma";
import {
  type CreateOrder,
  type UpdateOrder,
  createOrderSchema,
  updateOrderSchema,
} from "./schema";
import { NotFoundError, ValidationError } from "../utils/errors";
import { productService } from "../products/products.service";
import { usersService } from "../users/users.service";
import { getRandomValues } from "crypto";
import { pricesService } from "../prices/prices.service";
import { MESSAGES } from "../utils/message";
import { type IOrderService } from "./interfaces/order.interface";

async function createLineItemsData(
  lineItems: CreateOrder["lineItems"],
  calculatedTotal: number,
  orderCurrency: PriceCurrency | null
) {
  const lineItemsData = await Promise.all(
    lineItems.map(async (lineItem) => {
      const { productId, quantity } = lineItem;
      const product = await productService.get(productId);
      if (!product) {
        throw new NotFoundError(MESSAGES.PRODUCT.NOT_FOUND);
      }
      const productPrice = await pricesService.getByProductId(productId);

      if (!productPrice) {
        throw new NotFoundError(MESSAGES.PRICE.NOT_FOUND);
      }

      if (productPrice.currency !== orderCurrency) {
        throw new ValidationError(MESSAGES.PRICE.CURRENCY_DONT_MATCH);
      }

      const lineItemAmount = quantity * productPrice.amount;
      calculatedTotal += lineItemAmount;

      return {
        productId,
        quantity,
        amount: lineItemAmount,
        lineItemAmount,
        currency: productPrice.currency,
      };
    })
  );
  return lineItemsData;
}

export const ordersService: IOrderService = {
  create: async (data) => {
    let calculatedTotal = 0;
    let orderCurrency: PriceCurrency | null = null;

    const {
      success,
      data: orderData,
      error,
    } = await createOrderSchema.safeParseAsync(data);

    if (!success) {
      throw new ValidationError(error.message);
    }

    const { userId, lineItems, ...rest } = orderData;

    if (userId) {
      const existingUser = await usersService.get(orderData.userId);
      if (!existingUser) {
        throw new ValidationError(MESSAGES.USER.NOT_FOUND);
      }
    }

    if (!lineItems.length) {
      throw new ValidationError(MESSAGES.LINE_ITEM.REQUIRED);
    }

    const lineItemsData = await createLineItemsData(
      lineItems,
      calculatedTotal,
      orderCurrency
    );

    return prisma.order.create({
      data: {
        ...rest,
        total: calculatedTotal,
        currency: rest.currency,
        userId,
        status: OrderStatus.NEW,
        code: ordersService.generateCode(),
        lineItems: {
          create: lineItemsData,
        },
      },
    });
  },
  get: async (id: string) => {
    return prisma.order.findUniqueOrThrow({
      where: { id },
    });
  },
  getAll: async () => {
    return prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  },
  update: async (id: string, data: UpdateOrder) => {
    const {
      success,
      data: orderData,
      error,
    } = await updateOrderSchema.safeParseAsync(data);
    if (!success) {
      throw new ValidationError(error.message);
    }
    const existingOrder = await ordersService.get(id);
    if (!existingOrder) {
      throw new ValidationError(MESSAGES.ORDER.NOT_FOUND);
    }
    const { status } = orderData;

    return prisma.order.update({
      where: { id },
      data: {
        status,
      },
    });
  },
  delete: async (id: string) => {
    const existingOrder = await ordersService.get(id);
    if (!existingOrder) {
      throw new NotFoundError(MESSAGES.ORDER.NOT_FOUND);
    }
    return prisma.order.delete({
      where: { id },
    });
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
