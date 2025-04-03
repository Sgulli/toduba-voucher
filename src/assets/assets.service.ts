import { supabase } from "../config";
import { getEnv } from "../utils/env";

export const assetsService = {
  bucket: getEnv().BUCKET_NAME,

  upload: async (file?: Express.Multer.File) => {
    if (!file) {
      throw new Error("File is required");
    }
    const { filename, buffer, mimetype } = file;

    const { data, error } = await supabase.storage
      .from(assetsService.bucket)
      .upload(filename, buffer, {
        contentType: mimetype,
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  get: async (path: string) => {
    const { data, error } = await supabase.storage
      .from(assetsService.bucket)
      .download(path);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
