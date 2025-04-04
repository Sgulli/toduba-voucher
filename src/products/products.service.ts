import { prisma } from "../db/prisma";
import { IService } from "../interfaces/service.interface";
import {
  createProductSchema,
  updateProductSchema,
  type CreateProduct,
  type UpdateProduct,
} from "./schema";
import { NotFoundError, ValidationError } from "../utils/errors";
import { MESSAGES } from "../utils/message";
import { type ProductWithRelationships } from "./types/product-with-relationships.type";
import { kv } from "../config";

export const productService: IService<CreateProduct, ProductWithRelationships> =
  {
    create: async (data: CreateProduct) => {
      const {
        success,
        data: productData,
        error,
      } = await createProductSchema.safeParseAsync(data);

      if (!success) {
        throw new ValidationError(error.message);
      }

      const { prices, assets, ...rest } = productData;

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

      await kv.del("products:list");

      return product;
    },
    getAll: async () => {
      const cached = await kv.get<ProductWithRelationships[]>("products:list");
      if (cached) return cached;
      const products = await prisma.product.findMany({
        include: {
          prices: true,
          assets: true,
        },
      });

      await kv.set("products:list", products);

      return products;
    },
    get: async (id: string) => {
      const cached = await kv.get<ProductWithRelationships>(`products:${id}`);
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

      await kv.set(`products:${product.id}`, product);

      return product;
    },
    update: async (id: string, data: UpdateProduct) => {
      const {
        success,
        data: productData,
        error,
      } = await updateProductSchema.safeParseAsync(data);
      if (!success) {
        throw new ValidationError(error.message);
      }
      const existingProduct = await productService.get(id);
      if (!existingProduct) {
        throw new NotFoundError(MESSAGES.PRODUCT.NOT_FOUND);
      }
      const { prices, assets, ...rest } = productData;
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

      await kv.del("products:list");
      await kv.del(`products:${product.id}`);

      return product;
    },
    delete: async (id: string) => {
      const product = await prisma.product.delete({
        where: {
          id,
        },
      });
      await kv.del("products:list");
      await kv.del(`products:${product.id}`);
      return product;
    },
  };
