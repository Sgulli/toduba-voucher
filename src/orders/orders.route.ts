import express from "express";
import { API_PATHS } from "../utils/api-paths";
import { ordersController } from "./orders.controller";

const router = express.Router();

router.get(API_PATHS.ORDERS.GET_ALL, ordersController.getAll);

router.get(API_PATHS.ORDERS.GET, ordersController.get);

router.post(API_PATHS.ORDERS.CREATE, ordersController.create);

router.patch(API_PATHS.ORDERS.UPDATE, ordersController.update);

router.delete(API_PATHS.ORDERS.DELETE, ordersController.delete);

export default router;
