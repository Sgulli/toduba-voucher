import express from "express";
import { ordersService } from "./orders.service";
import { HTTP_STATUS } from "../utils/http-status";
import { API_PATHS } from "../utils/api-paths";
import { Response } from "../utils/response";

const router = express.Router();

router.get(API_PATHS.ORDERS.GET_ALL, async (_, res) => {
  const orders = await ordersService.getAll();
  const apiResponse = Response.success(orders);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});
router.get(API_PATHS.ORDERS.GET, async (req, res) => {
  const order = await ordersService.get(req.params.id);
  const apiResponse = Response.success(order);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.post(API_PATHS.ORDERS.CREATE, async (req, res) => {
  const order = await ordersService.create(req.body);
  const apiResponse = Response.success(order);
  res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
});

router.patch(API_PATHS.ORDERS.UPDATE, async (req, res) => {
  const order = await ordersService.update(req.params.id, req.body);
  const apiResponse = Response.success(order);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.delete(API_PATHS.ORDERS.DELETE, async (req, res) => {
  const order = await ordersService.delete(req.params.id);
  const apiResponse = Response.success(order);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

export default router;
