import express from "express";
import { API_PATHS } from "../utils/api-paths";
import { validate } from "../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema } from "./schema";
import { productController } from "./products.controller";

const router = express.Router();

router.get(API_PATHS.PRODUCTS.GET_ALL, productController.getAll);

router.get(API_PATHS.PRODUCTS.GET, productController.get);

router.post(
  API_PATHS.PRODUCTS.CREATE,
  validate(createProductSchema),
  productController.create
);

router.patch(
  API_PATHS.PRODUCTS.UPDATE,
  validate(updateProductSchema),
  productController.update
);

router.delete(API_PATHS.PRODUCTS.DELETE, productController.delete);

export default router;
