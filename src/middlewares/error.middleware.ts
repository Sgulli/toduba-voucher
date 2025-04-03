import { Request, Response, NextFunction } from "express";
import { ServerError } from "../types/server-error";
import { MESSAGES } from "../utils/message";
import { Response as ApiResponse } from "../utils/response";

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

  res.status(500).json({ error: MESSAGES.SERVER.INTERNAL_ERROR });
  next(err);
};
