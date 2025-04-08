import { ErrorRequestHandler } from "express";
import { HTTP_STATUS } from "../utils/http-status";
import { handleError } from "../utils/handle-error";

export const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  const apiError = handleError(err);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(apiError);
};
