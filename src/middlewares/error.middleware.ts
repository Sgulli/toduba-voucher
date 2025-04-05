import { Request, Response, NextFunction } from "express";
import { MESSAGES } from "../utils/message";
import { Response as ApiResponse } from "../utils/response";
import { HTTP_STATUS } from "../utils/http-status";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if ("statusCode" in err) {
    const apiError = ApiResponse.error(
      err.message,
      err.statusCode,
      err.cause as string | undefined
    );

    res.status(err.statusCode).json(apiError);
    next(apiError.message);
    return;
  }

  if (err instanceof PrismaClientKnownRequestError) {
    const apiError = ApiResponse.error(
      err.message,
      HTTP_STATUS.BAD_REQUEST,
      err.cause as string | undefined
    );
    res.status(HTTP_STATUS.BAD_REQUEST).json(apiError);
    next(apiError.message);
    return;
  }

  const apiError = ApiResponse.error(
    MESSAGES.SERVER.INTERNAL_ERROR,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    err.cause as string | undefined
  );

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(apiError);
  next(err.message);
};
