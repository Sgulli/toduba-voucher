import { PriceCurrency } from "@prisma/client";
import { z } from "zod";

export const createPriceSchema = z.object({
  amount: z.number().positive(),
  currency: z.enum([PriceCurrency.EUR, PriceCurrency.USD]),
  productId: z.string().nullable(),
});

export const updatePriceSchema = createPriceSchema.partial();

export type CreatePrice = z.infer<typeof createPriceSchema>;
export type UpdatePrice = z.infer<typeof updatePriceSchema>;
