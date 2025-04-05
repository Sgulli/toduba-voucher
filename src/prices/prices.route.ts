import express from "express";
import { API_PATHS } from "../utils/api-paths";
import { pricesController } from "./prices.controller";

const router = express.Router();

router.get(API_PATHS.PRICES.GET_ALL, pricesController.getAll);

router.get(API_PATHS.PRICES.GET, pricesController.get);

router.post(API_PATHS.PRICES.CREATE, pricesController.create);

router.patch(API_PATHS.PRICES.UPDATE, pricesController.update);

router.delete(API_PATHS.PRICES.DELETE, pricesController.delete);

export default router;
