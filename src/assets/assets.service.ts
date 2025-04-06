import { supabase } from "../config";
import { prisma } from "../db/prisma";
import { productService } from "../products/products.service";
import { getEnv } from "../utils/env";
import { ServerError, ValidationError } from "../utils/errors";
import { MESSAGES } from "../utils/message";
import { type IAssetsService } from "./interfaces/assets-service.interface";
import { type FileData } from "./types/file-data.type";

export const assetsService: IAssetsService = {
  bucket: getEnv().BUCKET_NAME,

  upload: async (
    productId: string,
    fileData?: FileData,
    file?: Express.Multer.File
  ) => {
    if (!file) throw new ValidationError(MESSAGES.ASSETS.FILE_REQUIRED);

    const { buffer, mimetype } = file;
    const { alt, fileName } = fileData ?? {};

    const { data, error } = await supabase.storage
      .from(assetsService.bucket)
      .upload(fileName ?? "file", buffer, {
        contentType: mimetype,
        upsert: true,
      });

    if (error) throw new ServerError(error.message);

    const product = await productService.get(productId);
    if (!product) throw new ValidationError(MESSAGES.PRODUCT.NOT_FOUND);
    const asset = await prisma.asset.create({
      data: {
        name: fileName ?? "file",
        path: data?.path,
        productId,
        alt: alt ?? "",
        mime: mimetype,
      },
    });

    const updatedAssets = [
      ...(product.assets?.map(({ id }) => ({ id })) ?? []),
      { id: asset.id },
    ];

    await productService.update(productId, { assets: updatedAssets });

    return asset;
  },

  get: async (id: string) => {
    const { path } = await prisma.asset.findFirstOrThrow({
      where: {
        id,
      },
    });

    const { data } = supabase.storage
      .from(assetsService.bucket)
      .getPublicUrl(path);

    return {
      url: data.publicUrl,
    };
  },
};
