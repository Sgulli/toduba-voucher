import express from "express";
import { pricesService } from "./prices.service";
import { API_PATHS } from "../utils/api-paths";
import { Response } from "../utils/response";
import { tryCatch } from "../utils/try-catch";
import { ServerError } from "../utils/errors";
import { HTTP_STATUS } from "../utils/http-status";

const router = express.Router();

router.get(API_PATHS.PRICES.GET_ALL, async (_, res) => {
  const { error, data } = await tryCatch(pricesService.getAll());
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.get(API_PATHS.PRICES.GET, async (req, res) => {
  const { error, data } = await tryCatch(pricesService.get(req.params.id));
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.post(API_PATHS.PRICES.CREATE, async (req, res) => {
  const { error, data } = await tryCatch(pricesService.create(req.body));
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
});

router.patch(API_PATHS.PRICES.UPDATE, async (req, res) => {
  const { error, data } = await tryCatch(
    pricesService.update(req.params.id, req.body)
  );
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.delete(API_PATHS.PRICES.DELETE, async (req, res) => {
  const { error, data } = await tryCatch(pricesService.delete(req.params.id));
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

export default router;
