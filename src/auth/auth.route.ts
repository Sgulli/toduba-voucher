import express from "express";
import { useAuth } from "../config/passport.config";
import { authService } from "./auth.service";
import { Response } from "../utils/response";
import { HTTP_STATUS } from "../utils/http-status";
import { NotFoundError, ServerError } from "../utils/errors";
import { MESSAGES } from "../utils/message";
import { API_PATHS } from "../utils/api-paths";
import { tryCatch } from "../utils/try-catch";

const router = express.Router();

router.post(API_PATHS.AUTH.SIGN_UP, async (req, res) => {
  const { error, data } = await tryCatch(authService.signUp(req.body));
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
});

router.post(API_PATHS.AUTH.SIGN_IN, async (req, res) => {
  const { error, data } = await tryCatch(authService.signIn(req.body));
  if (error) throw new ServerError(error.message);
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

router.get(API_PATHS.AUTH.ME, useAuth(), async (req, res) => {
  const user = req.user;
  if (!user) throw new NotFoundError(MESSAGES.USER.NOT_FOUND);
  const apiResponse = Response.success(user);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

export default router;
