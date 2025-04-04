import { Price, PriceCurrency } from "@prisma/client";
import { CreatePrice, createPriceSchema, UpdatePrice } from "./schema";
import { prisma } from "../db/prisma";
import { NotFoundError, ValidationError } from "../utils/errors";
import { MESSAGES } from "../utils/message";
import { IPriceService } from "./interfaces/prices.interface";
import { kv } from "../config";

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
    const price = await prisma.price.create({
      data: priceData,
    });

    await kv.del("prices:list");

    return price;
  },
  getAll: async () => {
    const cached = await kv.get<Price[]>("prices:list");
    if (cached) return cached;
    const prices = await prisma.price.findMany({
      where: {
        isActive: true,
      },
    });

    await kv.set("prices:list", prices);

    return prices;
  },
  get: async (id: string) => {
    const cached = await kv.get<Price>(`price:${id}`);
    if (cached) return cached;
    const price = await prisma.price.findUniqueOrThrow({
      where: { id, isActive: true },
    });

    await kv.set(`prices:${price.id}`, price);
    return price;
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
    const price = await prisma.price.update({
      where: { id },
      data: priceData,
    });

    await kv.del("prices:list");
    await kv.del(`prices:${price.id}`);
    return price;
  },
  delete: async (id: string) => {
    const existingPrice = await pricesService.get(id);
    if (!existingPrice) {
      throw new NotFoundError(MESSAGES.PRODUCT.NOT_FOUND);
    }

    const price = await prisma.price.delete({
      where: { id },
    });

    await kv.del("prices:list");
    await kv.del(`prices:${price.id}`);
    return price;
  },
  getByProductId: async (productId: string, currency = PriceCurrency.EUR) => {
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!existingProduct) {
      throw new NotFoundError(MESSAGES.PRODUCT.NOT_FOUND);
    }
    const price = await prisma.price.findFirstOrThrow({
      where: {
        productId,
        currency,
        isActive: true,
      },
    });
    await kv.set(`prices:${price?.id}`, price);

    return price;
  },
};
