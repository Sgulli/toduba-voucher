import { OrderStatus, PriceCurrency } from "@prisma/client";
import { z } from "zod";

export const orderSchema = z.object({
  id: z.string(),
  quantity: z.number().min(1),
  totalAmount: z.number().min(0),
  currency: z
    .enum([PriceCurrency.EUR, PriceCurrency.USD])
    .default(PriceCurrency.EUR),
  code: z.string(),
  status: z.enum([
    OrderStatus.PENDING,
    OrderStatus.REJECTED,
    OrderStatus.COMPLETED,
    OrderStatus.NEW,
  ]),
  createdAt: z.date(),
  updatedAt: z.date(),
  lineItems: z.array(
    z.object({
      id: z.string(),
      productId: z.string(),
      quantity: z.number().min(1),
      amount: z.number().min(0),
      currency: z
        .enum([PriceCurrency.EUR, PriceCurrency.USD])
        .default(PriceCurrency.EUR),
      createdAt: z.date(),
      updatedAt: z.date(),
      orderId: z.string(),
    })
  ),
});

export const createOrderSchema = z.object({
  lineItems: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1).max(100),
    })
  ),
});

export const updateOrderSchema = z
  .object({
    status: z.enum([
      OrderStatus.PENDING,
      OrderStatus.REJECTED,
      OrderStatus.COMPLETED,
    ]),
  })
  .partial();

export const getOrderSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const OrderUserIdSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export const orderPaginateSchema = z.object({
  userId: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export type Order = z.infer<typeof orderSchema>;
export type CreateOrder = z.infer<typeof createOrderSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;
