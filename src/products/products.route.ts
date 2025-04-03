import express from "express";
import { productService } from "./products.service";
import { HTTP_STATUS } from "../utils/http-status";
import { API_PATHS } from "../utils/api-paths";
import { Response } from "../utils/response";

const router = express.Router();

router.get(API_PATHS.PRODUCTS.GET_ALL, async (_, res) => {
  const products = await productService.getAll();
  const ApiResponse = Response.success(products);
  res.status(HTTP_STATUS.OK).jsonp(ApiResponse);
});

router.get(API_PATHS.PRODUCTS.GET, async (req, res) => {
  const product = await productService.get(req.params.id);
  const apiResponse = Response.success(product);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.post(API_PATHS.PRODUCTS.CREATE, async (req, res) => {
  const product = await productService.create(req.body);
  const apiResponse = Response.success(product);
  res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
});

router.patch(API_PATHS.PRODUCTS.UPDATE, async (req, res) => {
  const product = await productService.update(req.params.id, req.body);
  const apiResponse = Response.success(product);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.delete(API_PATHS.PRODUCTS.DELETE, async (req, res) => {
  const product = await productService.delete(req.params.id);
  const apiResponse = Response.success(product);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

export default router;
