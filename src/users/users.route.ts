import express from "express";
import { usersService } from "./users.service";

const router = express.Router();

router.get("/", async (_, res) => {
  const users = await usersService.getAll();
  res.status(200).jsonp(users);
});

router.get("/:id", async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.status(200).jsonp(user);
});

router.post("/", async (req, res) => {
  const user = await usersService.create(req.body);
  res.status(201).jsonp(user);
});

router.patch("/:id", async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  res.status(200).jsonp(user);
});

router.delete("/:id", async (req, res) => {
  const user = await usersService.delete(req.params.id);
  res.status(200).jsonp(user);
});

export default router;
