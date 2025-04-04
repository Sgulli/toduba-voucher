import express from "express";
import { ordersService } from "./orders.service";
import { HTTP_STATUS } from "../utils/http-status";
import { API_PATHS } from "../utils/api-paths";
import { Response } from "../utils/response";
import { tryCatch } from "../utils/try-catch";
import { ServerError } from "../utils/errors";

const router = express.Router();

router.get(API_PATHS.ORDERS.GET_ALL, async (_, res, next) => {
  const { error, data } = await tryCatch(ordersService.getAll());
  if (error) return next(new ServerError(error.message));
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});
router.get(API_PATHS.ORDERS.GET, async (req, res, next) => {
  const { error, data } = await tryCatch(ordersService.get(req.params.id));
  if (error) return next(new ServerError(error.message));
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.post(API_PATHS.ORDERS.CREATE, async (req, res, next) => {
  const { error, data } = await tryCatch(ordersService.create(req.body));
  if (error) return next(new ServerError(error.message));
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
});

router.patch(API_PATHS.ORDERS.UPDATE, async (req, res, next) => {
  const { error, data } = await tryCatch(
    ordersService.update(req.params.id, req.body)
  );
  if (error) return next(new ServerError(error.message));
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.delete(API_PATHS.ORDERS.DELETE, async (req, res, next) => {
  const { error, data } = await tryCatch(ordersService.delete(req.params.id));
  if (error) return next(new ServerError(error.message));
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

export default router;
