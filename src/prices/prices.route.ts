import express from "express";
import { pricesService } from "./prices.service";

const router = express.Router();

router.get("/", async (_, res) => {
  const prices = await pricesService.getAll();
  res.status(200).jsonp(prices);
});

router.get("/:id", async (req, res) => {
  const price = await pricesService.get(req.params.id);
  res.status(200).jsonp(price);
});

router.post("/", async (req, res) => {
  const price = await pricesService.create(req.body);
  res.status(201).jsonp(price);
});

router.patch("/:id", async (req, res) => {
  const price = await pricesService.update(req.params.id, req.body);
  res.status(200).jsonp(price);
});

router.delete("/:id", async (req, res) => {
  const price = await pricesService.delete(req.params.id);
  res.status(200).jsonp(price);
});

export default router;
