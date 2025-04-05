import { type Price, PriceCurrency } from "@prisma/client";
import { IService } from "../../interfaces/service.interface";
import { type CreatePrice } from "../schema";

export interface IPriceService
  extends Omit<IService<CreatePrice, Price>, "create" | "update"> {
  create: (productId: string, data: CreatePrice) => Promise<Price>;
  update: (
    id: string,
    productId: string,
    data: Partial<CreatePrice>
  ) => Promise<Price>;
  getByProductId: (
    productId: string,
    currency?: PriceCurrency
  ) => Promise<Price | null>;
  getFirstActive: (productId: string) => Promise<Price | null>;
}
