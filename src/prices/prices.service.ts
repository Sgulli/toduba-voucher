import { PriceCurrency } from "@prisma/client";
import { CreatePrice, createPriceSchema, UpdatePrice } from "./schema";
import { prisma } from "../db/prisma";
import { NotFoundError, ValidationError } from "../utils/errors";
import { MESSAGES } from "../utils/message";
import { IPriceService } from "./interfaces/prices.interface";

export const pricesService: IPriceService = {
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
        throw new NotFoundError(MESSAGES.PRODUCT.NOT_FOUND);
      }
    }
    return prisma.price.create({
      data: priceData,
    });
  },
  getAll: async () => {
    return prisma.price.findMany({
      where: {
        isActive: true,
      },
    });
  },
  get: async (id: string) => {
    return prisma.price.findUniqueOrThrow({
      where: { id, isActive: true },
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
      throw new NotFoundError(MESSAGES.PRODUCT.NOT_FOUND);
    }
    const { productId } = priceData;
    if (productId) {
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!existingProduct) {
        throw new NotFoundError(MESSAGES.PRODUCT.NOT_FOUND);
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
      throw new NotFoundError(MESSAGES.PRODUCT.NOT_FOUND);
    }

    return prisma.price.delete({
      where: { id },
    });
  },
  getByProductId: async (productId: string, currency = PriceCurrency.EUR) => {
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!existingProduct) {
      throw new NotFoundError(MESSAGES.PRODUCT.NOT_FOUND);
    }
    return prisma.price.findFirst({
      where: {
        productId,
        currency,
        isActive: true,
        isDefault: true,
      },
    });
  },
};
