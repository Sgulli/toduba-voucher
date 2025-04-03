import { Order, OrderStatus, PriceCurrency } from "@prisma/client";
import { prisma } from "../db/prisma";
import { IService } from "../interfaces/service.interface";
import {
  CreateOrder,
  createOrderSchema,
  UpdateOrder,
  updateOrderSchema,
} from "./schema";
import { NotFoundError, ValidationError } from "../utils/errors";
import { productService } from "../products/products.service";
import { usersService } from "../users/users.service";
import { getRandomValues } from "crypto";
interface IOrderService extends Omit<IService<CreateOrder, Order>, "update"> {
  update: (id: string, data: UpdateOrder) => Promise<Order>;
  generateCode: () => string;
}

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
        throw new NotFoundError("Product not found");
      }
      const productPrice = product.prices?.find(
        (price) => price.isActive && price.isDefault
      );

      if (!productPrice) {
        throw new NotFoundError("Product price not found");
      }

      if (productPrice.currency !== orderCurrency) {
        throw new ValidationError(
          "Product currency does not match line item currency"
        );
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
        throw new ValidationError("User not found");
      }
    }

    if (lineItems.length === 0) {
      throw new ValidationError("Line items are required");
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
        currency: rest.currency ?? orderCurrency,
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
      throw new ValidationError("Order not found");
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
      throw new NotFoundError("Order not found");
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
