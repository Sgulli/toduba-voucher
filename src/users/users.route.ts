import express from "express";
import { userService } from "./users.service";

const router = express.Router();

router.get("/", async (_, res) => {
  const users = await userService.getAll();
  res.status(200).jsonp(users);
});

router.get("/:id", async (req, res) => {
  const user = await userService.get(req.params.id);
  res.status(200).jsonp(user);
});

router.post("/", async (req, res) => {
  const user = await userService.create(req.body);
  res.status(201).jsonp(user);
});

router.patch("/:id", async (req, res) => {
  const user = await userService.update(req.params.id, req.body);
  res.status(200).jsonp(user);
});

router.delete("/:id", async (req, res) => {
  const user = await userService.delete(req.params.id);
  res.status(200).jsonp(user);
});

export default router;
