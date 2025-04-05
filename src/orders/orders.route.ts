import express from "express";
import { API_PATHS } from "../utils/api-paths";
import { ordersController } from "./orders.controller";
import { validate } from "../middlewares/validate.middleware";
import { createOrderSchema, updateOrderSchema } from "./schema";

const router = express.Router();

router.get(API_PATHS.ORDERS.GET_ALL, ordersController.getAll);

router.get(API_PATHS.ORDERS.GET, ordersController.get);

router.post(
  API_PATHS.ORDERS.CREATE,
  validate(createOrderSchema),
  ordersController.create
);

router.patch(
  API_PATHS.ORDERS.UPDATE,
  validate(updateOrderSchema),
  ordersController.update
);

router.delete(API_PATHS.ORDERS.DELETE, ordersController.delete);

export default router;
