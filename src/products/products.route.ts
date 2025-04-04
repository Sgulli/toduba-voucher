import express from "express";
import { productService } from "./products.service";
import { HTTP_STATUS } from "../utils/http-status";
import { API_PATHS } from "../utils/api-paths";
import { Response } from "../utils/response";
import { tryCatch } from "../utils/try-catch";
import { ServerError } from "../utils/errors";

const router = express.Router();

router.get(API_PATHS.PRODUCTS.GET_ALL, async (_, res) => {
  const { error, data } = await tryCatch(productService.getAll());
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.get(API_PATHS.PRODUCTS.GET, async (req, res) => {
  const { error, data } = await tryCatch(productService.get(req.params.id));
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.post(API_PATHS.PRODUCTS.CREATE, async (req, res) => {
  const { error, data } = await tryCatch(productService.create(req.body));
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
});

router.patch(API_PATHS.PRODUCTS.UPDATE, async (req, res) => {
  const { error, data } = await tryCatch(
    productService.update(req.params.id, req.body)
  );
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.delete(API_PATHS.PRODUCTS.DELETE, async (req, res) => {
  const { error, data } = await tryCatch(productService.delete(req.params.id));
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

export default router;
