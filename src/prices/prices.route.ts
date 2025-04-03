import express from "express";
import { pricesService } from "./prices.service";
import { API_PATHS } from "../utils/api-paths";

const router = express.Router();

router.get(API_PATHS.PRICES.GET_ALL, async (_, res) => {
  const prices = await pricesService.getAll();
  res.status(200).jsonp(prices);
});

router.get(API_PATHS.PRICES.GET, async (req, res) => {
  const price = await pricesService.get(req.params.id);
  res.status(200).jsonp(price);
});

router.post(API_PATHS.PRICES.CREATE, async (req, res) => {
  const price = await pricesService.create(req.body);
  res.status(201).jsonp(price);
});

router.patch(API_PATHS.PRICES.UPDATE, async (req, res) => {
  const price = await pricesService.update(req.params.id, req.body);
  res.status(200).jsonp(price);
});

router.delete(API_PATHS.PRICES.DELETE, async (req, res) => {
  const price = await pricesService.delete(req.params.id);
  res.status(200).jsonp(price);
});

export default router;
