import { UnauthorizedError } from "../utils/errors";
import { HTTP_STATUS } from "../utils/http-status";
import { MESSAGES } from "../utils/message";
import { Response } from "../utils/response";
import { tryCatch } from "../utils/try-catch";
import { authService } from "./auth.service";
import { IAuthController } from "./interface/auth-controller.interface";

export const authController: IAuthController = {
  signin: async (req, res, next) => {
    const { email, password } = req.validated.body ?? {};
    const { error, data } = await tryCatch(
      authService.signIn({
        email,
        password,
      })
    );
    if (error) return next(error);
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
  signup: async (req, res, next) => {
    const { error, data } = await tryCatch(
      authService.signUp(req.validated.body)
    );
    if (error) return next(error);
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
  },
  me: async (req, res, next) => {
    const user = req.user;
    if (!user) return next(new UnauthorizedError(MESSAGES.USER.NOT_FOUND));
    const apiResponse = Response.success(user);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
};
