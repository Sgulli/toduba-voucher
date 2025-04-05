import { IController } from "../interfaces/controller.interface";
import { ServerError } from "../utils/errors";
import { HTTP_STATUS } from "../utils/http-status";
import { Response } from "../utils/response";
import { tryCatch } from "../utils/try-catch";
import { pricesService } from "./prices.service";

export const pricesController: IController = {
  getAll: async (req, res, next) => {
    const { error, data } = await tryCatch(pricesService.getAll());
    if (error) return next(new ServerError(error.message));
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
  get: async (req, res, next) => {
    const { error, data } = await tryCatch(pricesService.get(req.params.id));
    if (error) return next(new ServerError(error.message));
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
  create: async (req, res, next) => {
    const { error, data } = await tryCatch(
      pricesService.create(req.params.productId, req.validated.body)
    );
    if (error) return next(new ServerError(error.message));
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
  },
  update: async (req, res, next) => {
    const { error, data } = await tryCatch(
      pricesService.update(
        req.params.id,
        req.params.productId,
        req.validated.body
      )
    );
    if (error) return next(new ServerError(error.message));
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
  delete: async (req, res, next) => {
    const { error, data } = await tryCatch(pricesService.delete(req.params.id));
    if (error) return next(new ServerError(error.message));
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
};
