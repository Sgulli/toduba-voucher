import { prisma } from "../db/prisma";

export const ordersService = {
  create: async (data: any) => {
    return prisma.order.create({
      data,
    });
  },
  get: async (id: string) => {
    return prisma.order.findUnique({
      where: { id },
    });
  },
  getAll: async () => {
    return prisma.order.findMany();
  },
  update: async (id: string, data: any) => {
    return prisma.order.update({
      where: { id },
      data,
    });
  },
  delete: async (id: string) => {
    return prisma.order.delete({
      where: { id },
    });
  },
};
