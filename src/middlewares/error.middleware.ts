import { Request, Response, NextFunction } from "express";
import { ServerError } from "../types/server-error";
import { MESSAGES } from "../utils/message";

export const errorHandler = (
  err: ServerError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if ("statusCode" in err) {
    res.status(err.statusCode).json({ error: err.message });
    next(err);
    return;
  }

  res.status(500).json({ error: MESSAGES.SERVER.INTERNAL_ERROR });
  next(err);
};
