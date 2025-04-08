import type { Order } from "@prisma/client";
import { IService } from "../../interfaces/service.interface";
import type { CreateOrder, UpdateOrder } from "../schema";

export interface IOrderService
  extends Omit<IService<CreateOrder, Order>, "update" | "create" | "getAll"> {
  getAll: (userId: string, page: number, limit: number) => Promise<Order[]>;
  create: (userId: string, data: CreateOrder) => Promise<Order>;
  update: (id: string, data: UpdateOrder) => Promise<Order>;
  generateCode: () => string;
  paginate: (userId: string, page: number, limit: number) => Promise<any[]>;
}
