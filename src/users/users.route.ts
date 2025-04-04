import express from "express";
import { usersService } from "./users.service";
import { HTTP_STATUS } from "../utils/http-status";
import { API_PATHS } from "../utils/api-paths";
import { Response } from "../utils/response";
import { tryCatch } from "../utils/try-catch";
import { ServerError } from "../utils/errors";

const router = express.Router();

router.get(API_PATHS.USERS.GET_ALL, async (_, res) => {
  const { error, data } = await tryCatch(usersService.getAll());
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.get(API_PATHS.USERS.GET, async (req, res) => {
  const { error, data } = await tryCatch(usersService.get(req.params.id));
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.post(API_PATHS.USERS.CREATE, async (req, res) => {
  const { error, data } = await tryCatch(usersService.create(req.body));
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
});

router.patch(API_PATHS.USERS.UPDATE, async (req, res) => {
  const { error, data } = await tryCatch(
    usersService.update(req.params.id, req.body)
  );
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.delete(API_PATHS.USERS.DELETE, async (req, res) => {
  const { error, data } = await tryCatch(usersService.delete(req.params.id));
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

export default router;
