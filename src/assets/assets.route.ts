import express from "express";
import { API_PATHS } from "../utils/api-paths";
import { useUpload } from "../config";
import { assetsController } from "./assets.controller";

const router = express.Router();

router.post(
  API_PATHS.ASSETS.UPLOAD,
  useUpload("file"),
  assetsController.upload
);

router.get(API_PATHS.ASSETS.GET, assetsController.get);

export default router;
