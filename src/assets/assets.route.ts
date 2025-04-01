import express from "express";
import { assetsService } from "./assets.service";

const router = express.Router();

router.post("/upload", async (req, res) => {
  const upload = await assetsService.upload(req.file);
  res.status(201).jsonp(upload);
});

router.get("/download/:path", async (req, res) => {
  const download = await assetsService.get(req.params.path);
  res.status(200).jsonp(download);
});
