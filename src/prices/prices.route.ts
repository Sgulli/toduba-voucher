import express from "express";
import { pricesService } from "./prices.service";
import { API_PATHS } from "../utils/api-paths";
import { Response } from "../utils/response";

const router = express.Router();

router.get(API_PATHS.PRICES.GET_ALL, async (_, res) => {
  const prices = await pricesService.getAll();
  const apiResponse = Response.success(prices);
  res.status(200).jsonp(apiResponse);
});

router.get(API_PATHS.PRICES.GET, async (req, res) => {
  const price = await pricesService.get(req.params.id);
  const apiResponse = Response.success(price);
  res.status(200).jsonp(apiResponse);
});

router.post(API_PATHS.PRICES.CREATE, async (req, res) => {
  const price = await pricesService.create(req.body);
  const apiResponse = Response.success(price);
  res.status(201).jsonp(apiResponse);
});

router.patch(API_PATHS.PRICES.UPDATE, async (req, res) => {
  const price = await pricesService.update(req.params.id, req.body);
  const apiResponse = Response.success(price);
  res.status(200).jsonp(apiResponse);
});

router.delete(API_PATHS.PRICES.DELETE, async (req, res) => {
  const price = await pricesService.delete(req.params.id);
  const apiResponse = Response.success(price);
  res.status(200).jsonp(apiResponse);
});

export default router;
