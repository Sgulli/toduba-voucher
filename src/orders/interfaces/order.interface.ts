import type { Order } from "@prisma/client";
import { IService } from "../../interfaces/service.interface";
import type { CreateOrder, UpdateOrder } from "../schema";

export interface IOrderService
  extends Omit<IService<CreateOrder, Order>, "update"> {
  update: (id: string, data: UpdateOrder) => Promise<Order>;
  generateCode: () => string;
}
