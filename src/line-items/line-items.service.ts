import { type LineItem } from "@prisma/client";
import { prisma } from "../db/prisma";
import { ILineItemService } from "./interfaces/line-item.interface";

export const lineItemService: ILineItemService = {
  create: async (data) => {
    return prisma.lineItem.create({
      data,
    });
  },
  get: async (id: string) => {
    return prisma.lineItem.findUniqueOrThrow({
      where: { id },
    });
  },
  getAll: async ({ orderId }: { orderId: string }) => {
    return prisma.lineItem.findMany({
      where: {
        orderId,
      },
    });
  },
  update: async (id: string, data: LineItem) => {
    return prisma.lineItem.update({
      where: { id },
      data,
    });
  },
  delete: async (id: string) => {
    return prisma.lineItem.delete({
      where: { id },
    });
  },
  getByOrderId: async (orderId: string) => {
    return prisma.lineItem.findFirst({
      where: { orderId },
    });
  },
};
