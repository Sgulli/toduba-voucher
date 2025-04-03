import express from "express";
import { usersService } from "./users.service";
import { HTTP_STATUS } from "../utils/http-status";
import { API_PATHS } from "../utils/api-paths";
import { Response } from "../utils/response";

const router = express.Router();

router.get(API_PATHS.USERS.GET_ALL, async (_, res) => {
  const users = await usersService.getAll();
  const apiResponse = Response.success(users);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.get(API_PATHS.USERS.GET, async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.status(HTTP_STATUS.OK).jsonp(user);
});

router.post(API_PATHS.USERS.CREATE, async (req, res) => {
  const user = await usersService.create(req.body);
  res.status(HTTP_STATUS.CREATED).jsonp(user);
});

router.patch(API_PATHS.USERS.UPDATE, async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  res.status(HTTP_STATUS.OK).jsonp(user);
});

router.delete(API_PATHS.USERS.DELETE, async (req, res) => {
  const user = await usersService.delete(req.params.id);
  res.status(HTTP_STATUS.OK).jsonp(user);
});

export default router;
