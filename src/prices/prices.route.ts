import express from "express";
import { API_PATHS } from "../utils/api-paths";
import { pricesController } from "./prices.controller";
import { validate } from "../middlewares/validate.middleware";
import { createPriceSchema, updatePriceSchema } from "./schema";

const router = express.Router();

router.get(API_PATHS.PRICES.GET_ALL, pricesController.getAll);

router.get(API_PATHS.PRICES.GET, pricesController.get);

router.post(
  API_PATHS.PRICES.CREATE,
  validate(createPriceSchema),
  pricesController.create
);

router.patch(
  API_PATHS.PRICES.UPDATE,
  validate(updatePriceSchema),
  pricesController.update
);

router.delete(API_PATHS.PRICES.DELETE, pricesController.delete);

export default router;
