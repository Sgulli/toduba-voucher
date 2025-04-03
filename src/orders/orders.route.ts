import express from "express";
import { ordersService } from "./orders.service";
import { HTTP_STATUS } from "../utils/http-status";
import { API_PATHS } from "../utils/api-paths";

const router = express.Router();

router.get(API_PATHS.ORDERS.GET_ALL, async (_, res) => {
  const orders = await ordersService.getAll();
  res.status(HTTP_STATUS.OK).jsonp(orders);
});
router.get(API_PATHS.ORDERS.GET, async (req, res) => {
  const order = await ordersService.get(req.params.id);
  res.status(HTTP_STATUS.OK).jsonp(order);
});

router.post(API_PATHS.ORDERS.CREATE, async (req, res) => {
  const order = await ordersService.create(req.body);
  res.status(HTTP_STATUS.CREATED).jsonp(order);
});

router.patch(API_PATHS.ORDERS.UPDATE, async (req, res) => {
  const order = await ordersService.update(req.params.id, req.body);
  res.status(HTTP_STATUS.OK).jsonp(order);
});

router.delete(API_PATHS.ORDERS.DELETE, async (req, res) => {
  const order = await ordersService.delete(req.params.id);
  res.status(HTTP_STATUS.OK).jsonp(order);
});

export default router;
