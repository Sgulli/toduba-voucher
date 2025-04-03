import { LineItem } from "@prisma/client";
import { IService } from "../interfaces/service.interface";
import { prisma } from "../db/prisma";

interface ILineItemService
  extends Omit<IService<LineItem, LineItem>, "getAll"> {
  getAll: (params: { orderId: string }) => Promise<LineItem[]>;
  getByOrderId: (orderId: string) => Promise<LineItem | null>;
}

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
