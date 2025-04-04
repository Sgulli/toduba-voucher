import { PriceCurrency } from "@prisma/client";
import { CreateOrder } from "../schema";
import { productService } from "../../products/products.service";
import { NotFoundError, ValidationError } from "../../utils/errors";
import { MESSAGES } from "../../utils/message";
import { pricesService } from "../../prices/prices.service";

export async function createLineItemsData(
  lineItems: CreateOrder["lineItems"],
  calculatedTotal: number,
  orderCurrency: PriceCurrency | null
) {
  const lineItemsData = await Promise.all(
    lineItems.map(async (lineItem) => {
      const { productId, quantity } = lineItem;
      const product = await productService.get(productId);
      if (!product) {
        throw new NotFoundError(MESSAGES.PRODUCT.NOT_FOUND);
      }
      const productPrice = await pricesService.getByProductId(productId);

      if (!productPrice) {
        throw new NotFoundError(MESSAGES.PRICE.NOT_FOUND);
      }

      if (productPrice.currency !== orderCurrency) {
        throw new ValidationError(MESSAGES.PRICE.CURRENCY_DONT_MATCH);
      }

      const lineItemAmount = quantity * productPrice.amount;
      calculatedTotal += lineItemAmount;

      return {
        productId,
        quantity,
        amount: lineItemAmount,
        lineItemAmount,
        currency: productPrice.currency,
      };
    })
  );
  return lineItemsData;
}
