import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/errors";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const notFoundError = new NotFoundError(`
    ${req.method} ${req.originalUrl} not found`);

  res.status(notFoundError.statusCode).json({
    error: notFoundError.message,
  });
  next(notFoundError);
};
