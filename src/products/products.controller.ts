import { IController } from "../interfaces/controller.interface";
import { ServerError } from "../utils/errors";
import { HTTP_STATUS } from "../utils/http-status";
import { Response } from "../utils/response";
import { tryCatch } from "../utils/try-catch";
import { productService } from "./products.service";

export const productController: IController = {
  getAll: async (req, res, next) => {
    const { error, data } = await tryCatch(productService.getAll());
    if (error) return next(new ServerError(error.message));
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
  get: async (req, res, next) => {
    const { error, data } = await tryCatch(productService.get(req.params.id));
    if (error) return next(new ServerError(error.message));
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
  create: async (req, res, next) => {
    const { error, data } = await tryCatch(
      productService.create(req.validated.body)
    );
    if (error) return next(new ServerError(error.message));
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
  },
  update: async (req, res, next) => {
    const { error, data } = await tryCatch(
      productService.update(req.params.id, req.validated.body)
    );
    if (error) return next(new ServerError(error.message));
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
  delete: async (req, res, next) => {
    const { error, data } = await tryCatch(
      productService.delete(req.params.id)
    );
    if (error) return next(new ServerError(error.message));
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
};
