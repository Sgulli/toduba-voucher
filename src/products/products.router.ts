import express from "express";
import { productService } from "./products.service";

const router = express.Router();

router.get("/", async (_, res) => {
  const products = await productService.getAll();
  res.status(200).jsonp(products);
});

router.get("/:id", async (req, res) => {
  const product = await productService.get(req.params.id);
  res.status(200).jsonp(product);
});

router.post("/", async (req, res) => {
  const product = await productService.create(req.body);
  res.status(201).jsonp(product);
});

router.patch("/:id", async (req, res) => {
  const product = await productService.update(req.params.id, req.body);
  res.status(200).jsonp(product);
});

router.delete("/:id", async (req, res) => {
  const product = await productService.delete(req.params.id);
  res.status(200).jsonp(product);
});
