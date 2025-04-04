import express from "express";
import { assetsService } from "./assets.service";
import { HTTP_STATUS } from "../utils/http-status";
import { tryCatch } from "../utils/try-catch";
import { ServerError } from "../utils/errors";
import { Response } from "../utils/response";

const router = express.Router();

router.post(":productId/upload", async (req, res, next) => {
  const { alt } = req.body;
  const { error, data } = await tryCatch(
    assetsService.upload(req.params.productId, alt, req.file)
  );
  if (error) return next(new ServerError(error.message));
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.CREATED).jsonp(apiResponse);
});

router.get("/download/:id", async (req, res, next) => {
  const { error, data } = await tryCatch(assetsService.get(req.params.id));
  if (error) return next(new ServerError(error.message));
  const apiResponse = Response.success(data);
  res.status(HTTP_STATUS.OK).jsonp(apiResponse);
});

export default router;
