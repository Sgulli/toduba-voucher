import { Price } from "@prisma/client";
import { IService } from "../interfaces/service.interface";
import { CreatePrice, createPriceSchema, UpdatePrice } from "./schema";
import { prisma } from "../db/prisma";
import { NotFoundError, ValidationError } from "../utils/errors";

export const pricesService: IService<CreatePrice, Price> = {
  create: async (data: CreatePrice) => {
    const {
      success,
      data: priceData,
      error,
    } = await createPriceSchema.safeParseAsync(data);
    if (!success) {
      throw new ValidationError(error.message);
    }

    const { productId } = priceData;
    if (productId) {
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!existingProduct) {
        throw new NotFoundError("Product not found");
      }
    }
    return prisma.price.create({
      data: priceData,
    });
  },
  getAll: async () => {
    return prisma.price.findMany();
  },
  get: async (id: string) => {
    return prisma.price.findUniqueOrThrow({
      where: { id },
    });
  },
  update: async (id: string, data: UpdatePrice) => {
    const {
      success,
      data: priceData,
      error,
    } = await createPriceSchema.safeParseAsync(data);
    if (!success) {
      throw new ValidationError(error.message);
    }
    const existingPrice = await pricesService.get(id);
    if (!existingPrice) {
      throw new NotFoundError("Price not found");
    }
    const { productId } = priceData;
    if (productId) {
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!existingProduct) {
        throw new NotFoundError("Product not found");
      }
    }
    return prisma.price.update({
      where: { id },
      data: priceData,
    });
  },
  delete: async (id: string) => {
    const existingPrice = await pricesService.get(id);
    if (!existingPrice) {
      throw new NotFoundError("Price not found");
    }

    return prisma.price.delete({
      where: { id },
    });
  },
};
