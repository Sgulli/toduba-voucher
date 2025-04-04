import { Request, Response, NextFunction } from "express";
import { ServerError } from "../types/server-error";
import { MESSAGES } from "../utils/message";
import { Response as ApiResponse } from "../utils/response";
import { HTTP_STATUS } from "../utils/http-status";

export const errorHandler = (
  err: ServerError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if ("statusCode" in err) {
    const apiError = ApiResponse.error(
      err.message,
      err.statusCode,
      err.cause as string
    );

    res.status(err.statusCode).json(apiError);
    next(apiError);
    return;
  }

  res
    .status(HTTP_STATUS.SERVICE_UNAVAILABLE)
    .json({ error: MESSAGES.SERVER.INTERNAL_ERROR });
  next(err);
};
