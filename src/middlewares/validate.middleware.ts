import type { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { ValidationError } from "../utils/errors";

type Targets = "body" | "query" | "params";

export const validate =
  (schema: AnyZodObject, target: Targets = "body") =>
  async (req: Request, _: Response, next: NextFunction) => {
    const { success, data, error } = await schema.safeParseAsync(req[target]);
    if (!success) {
      const validationError = new ValidationError(error.message);
      next(validationError);
      return;
    }
    req.validated = { ...req.validated, [target]: data };
    next();
  };
