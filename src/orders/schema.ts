import { OrderStatus, PriceCurrency } from "@prisma/client";
import { z } from "zod";

export const createOrderSchema = z.object({
  userId: z.string(),
  quantity: z.number().min(1),
  totalAmount: z.number().min(0),
  currency: z
    .enum([PriceCurrency.EUR, PriceCurrency.USD])
    .default(PriceCurrency.EUR),
  code: z.string(),
  lineItems: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
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

export type CreateOrder = z.infer<typeof createOrderSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;
