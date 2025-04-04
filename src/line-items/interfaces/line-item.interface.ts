import { type LineItem } from "@prisma/client";
import { type IService } from "../../interfaces/service.interface";

export interface ILineItemService
  extends Omit<IService<LineItem, LineItem>, "getAll"> {
  getAll: (params: { orderId: string }) => Promise<LineItem[]>;
  getByOrderId: (orderId: string) => Promise<LineItem | null>;
}
