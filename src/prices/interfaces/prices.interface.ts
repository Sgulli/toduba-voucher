import { type Price, PriceCurrency } from "@prisma/client";
import { IService } from "../../interfaces/service.interface";
import { type CreatePrice } from "../schema";

export interface IPriceService extends IService<CreatePrice, Price> {
  getByProductId: (
    productId: string,
    currency?: PriceCurrency
  ) => Promise<Price | null>;
}
