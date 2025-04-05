import { prisma } from "../db/prisma";
import { type IService } from "../interfaces/service.interface";
import { type CreateProduct, type UpdateProduct } from "./schema";
import { NotFoundError } from "../utils/errors";
import { MESSAGES } from "../utils/message";
import { type ProductWithRelationships } from "./types/product-with-relationships.type";
import { kv } from "../config";
import { kvKeyFn } from "../utils/kv-key-fn";

export const productService: IService<CreateProduct, ProductWithRelationships> =
  {
    create: async (data: CreateProduct) => {
      const { prices, assets, ...rest } = data;

      const product = await prisma.product.create({
        data: {
          ...rest,
          prices: {
            connect: prices,
          },
          assets: {
            connect: assets,
          },
        },
      });
      await kv.del(kvKeyFn("products"));
      return product;
    },
    getAll: async () => {
      const cached = await kv.get<ProductWithRelationships[]>(
        kvKeyFn("products")
      );
      if (cached && cached.length > 0) return cached;
      const products = await prisma.product.findMany({
        include: {
          prices: true,
          assets: true,
        },
      });
      await kv.set(kvKeyFn("products"), products);
      return products;
    },
    get: async (id: string) => {
      const cached = await kv.get<ProductWithRelationships>(
        kvKeyFn("products", id)
      );
      if (cached) return cached;
      const product = await prisma.product.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          prices: true,
          assets: true,
        },
      });
      await kv.set(kvKeyFn("products", product.id), product);
      return product;
    },
    update: async (id: string, data: UpdateProduct) => {
      const { prices, assets, ...rest } = data;
      const existingProduct = await productService.get(id);
      if (!existingProduct) throw new NotFoundError(MESSAGES.PRODUCT.NOT_FOUND);
      const product = await prisma.product.update({
        where: {
          id,
        },
        data: {
          ...rest,
          prices: {
            set: prices,
          },
          assets: {
            set: assets,
          },
        },
      });
      await Promise.all([
        kv.set(kvKeyFn("products", product.id), product),
        kv.del(kvKeyFn("products")),
      ]);
      return product;
    },
    delete: async (id: string) => {
      const product = await prisma.product.delete({
        where: {
          id,
        },
      });
      await Promise.all([
        kv.del(kvKeyFn("products")),
        kv.del(kvKeyFn("products", product.id)),
      ]);
      return product;
    },
  };
