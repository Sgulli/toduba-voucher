import { Product } from "@prisma/client";
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

export const productService: IService<CreateProduct, Product> = {
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
    return prisma.product.create({
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
  },
  getAll: () => {
    return prisma.product.findMany();
  },
  get: (id: string) => {
    return prisma.product.findUniqueOrThrow({
      where: {
        id,
      },
    });
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
    return prisma.product.update({
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
  },
  delete: (id: string) => {
    // maybe in a production app is better to soft delete
    return prisma.product.delete({
      where: {
        id,
      },
    });
  },
};
