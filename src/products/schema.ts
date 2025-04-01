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
  prices: z.array(connectPriceSchema),
  assets: z.array(connectAssetSchema),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProduct = z.infer<typeof createProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
