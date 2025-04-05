import { CreateOrder } from "../schema";
import { productService } from "../../products/products.service";
import { NotFoundError, ValidationError } from "../../utils/errors";
import { MESSAGES } from "../../utils/message";
import { pricesService } from "../../prices/prices.service";
import { PriceCurrency } from "@prisma/client";

export async function createLineItemsData(
  lineItems: CreateOrder["lineItems"] | undefined
) {
  if (!lineItems?.length) return [];

  const lineItemsData = await Promise.all(
    lineItems.map(async (lineItem) => {
      let prevCurrency: PriceCurrency | undefined;
      const { productId, quantity } = lineItem;
      const product = await productService.get(productId);

      if (!product) {
        throw new NotFoundError(MESSAGES.PRODUCT.NOT_FOUND);
      }

      const productPrice = await pricesService.getByProductId(productId);

      if (!productPrice) {
        throw new NotFoundError(MESSAGES.PRICE.NOT_FOUND);
      }

      prevCurrency = productPrice.currency;
      if (prevCurrency && prevCurrency !== productPrice?.currency) {
        throw new ValidationError(MESSAGES.PRICE.CURRENCY_DONT_MATCH);
      }

      const lineItemAmount = quantity * productPrice.amount;

      return {
        productId,
        quantity,
        amount: lineItemAmount,
        currency: productPrice.currency,
      };
    })
  );
  return lineItemsData;
}
