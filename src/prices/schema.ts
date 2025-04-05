import { PriceCurrency } from "@prisma/client";
import { z } from "zod";

export const priceSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  currency: z.enum([PriceCurrency.EUR, PriceCurrency.USD]),
  productId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createPriceSchema = z.object({
  amount: z.number().positive(),
  currency: z
    .enum([PriceCurrency.EUR, PriceCurrency.USD])
    .default(PriceCurrency.EUR),
});

export const priceParamsSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const updatePriceSchema = createPriceSchema
  .extend({
    isActive: z.boolean(),
  })
  .partial();

export type Price = z.infer<typeof priceSchema>;
export type CreatePrice = z.infer<typeof createPriceSchema>;
export type UpdatePrice = z.infer<typeof updatePriceSchema>;
