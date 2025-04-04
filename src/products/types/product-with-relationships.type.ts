import { Asset, Price, Product } from "@prisma/client";

type ProductRelationships = {
  prices: Price[];
  assets: Asset[];
};

export type ProductWithRelationships = Product & Partial<ProductRelationships>;
