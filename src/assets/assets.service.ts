import { supabase } from "../config";
import { prisma } from "../db/prisma";
import { productService } from "../products/products.service";
import { getEnv } from "../utils/env";
import { ServerError, ValidationError } from "../utils/errors";
import { MESSAGES } from "../utils/message";
import { type IAssetsService } from "./interfaces/assets.interface";

export const assetsService: IAssetsService = {
  bucket: getEnv().BUCKET_NAME,

  upload: async (
    productId: string,
    alt?: string,
    file?: Express.Multer.File
  ) => {
    if (!file) throw new ValidationError(MESSAGES.ASSETS.FILE_REQUIRED);

    const { filename, buffer, mimetype } = file;

    const { data, error } = await supabase.storage
      .from(assetsService.bucket)
      .upload(filename, buffer, {
        contentType: mimetype,
        upsert: true,
      });

    if (error) throw new ServerError(error.message);

    const product = await productService.get(productId);
    if (!product) {
      throw new ValidationError(MESSAGES.PRODUCT.NOT_FOUND);
    }

    const asset = await prisma.asset.create({
      data: {
        name: filename,
        url: data?.path,
        productId,
        alt,
        mime: mimetype,
      },
    });

    const updatedAssets = [
      ...(product.assets?.map(({ id }) => ({ id })) ?? []),
      { id: asset.id },
    ];

    await productService.update(productId, { assets: updatedAssets });

    return data;
  },

  get: async (id: string) => {
    const { url } = await prisma.asset.findFirstOrThrow({
      where: {
        id,
      },
    });

    return {
      url,
    };
  },
};
