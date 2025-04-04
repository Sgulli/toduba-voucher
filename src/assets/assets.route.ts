import express from "express";
import { assetsService } from "./assets.service";

const router = express.Router();

router.post(":productId/upload", async (req, res) => {
  const { alt } = req.body;
  const upload = await assetsService.upload(
    req.params.productId,
    alt,
    req.file
  );
  res.status(201).jsonp(upload);
});

router.get("/download/:id", async (req, res) => {
  const download = await assetsService.get(req.params.id);
  res.status(200).jsonp(download);
});

export default router;
