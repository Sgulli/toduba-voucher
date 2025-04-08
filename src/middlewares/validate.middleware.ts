import type { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { ValidationError } from "../utils/errors";

type Targets = "body" | "query" | "params";

export const validate =
  (schema: AnyZodObject, target: Targets = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = schema.safeParse(req[target]);
    if (!success) {
      const validationError = new ValidationError(error.message);
      req.log.error({ name: "Server" }, error.message);
      res.status(validationError.statusCode).json(validationError);
      return;
    }
    req.validated = { ...req.validated, [target]: data };
    next();
  };
