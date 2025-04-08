import { IController } from "../interfaces/controller.interface";
import { HTTP_STATUS } from "../utils/http-status";
import { Response } from "../utils/response";
import { tryCatch } from "../utils/try-catch";
import { ordersService } from "./orders.service";

export const ordersController: IController = {
  getAll: async (req, res, next) => {
    const { error, data } = await tryCatch(
      ordersService.paginate(
        req.validated.query.userId,
        req.validated.query.page,
        req.validated.query.limit
      )
    );
    if (error) return next(error);
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
  get: async (req, res, next) => {
    const { error, data } = await tryCatch(ordersService.get(req.params.id));
    if (error) return next(error);
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
  create: async (req, res, next) => {
    const { error, data } = await tryCatch(
      ordersService.create(req.user?.id, req.validated.body)
    );
    if (error) return next(error);
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
  },
  update: async (req, res, next) => {
    const { error, data } = await tryCatch(
      ordersService.update(req.user?.id, req.validated.body)
    );
    if (error) return next(error);
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
  delete: async (req, res, next) => {
    const { error, data } = await tryCatch(ordersService.delete(req.params.id));
    if (error) return next(error);
    const apiResponse = Response.success(data);
    res.status(HTTP_STATUS.OK).jsonp(apiResponse);
  },
};
