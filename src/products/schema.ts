import { z } from "zod";

export const connectAssetSchema = z.object({
  id: z.string(),
});

export const connectPriceSchema = z.object({
  id: z.string(),
});

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  prices: z.array(connectPriceSchema).optional(),
  assets: z.array(connectAssetSchema).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProduct = z.infer<typeof createProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
