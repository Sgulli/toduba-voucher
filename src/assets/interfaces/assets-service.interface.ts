import { Asset } from "@prisma/client";
import { GetResponse } from "../types/get-response.type";

export interface IAssetsService {
  bucket: string;
  upload: (
    productId: string,
    alt?: string,
    file?: Express.Multer.File
  ) => Promise<Asset>;
  get: (id: string) => Promise<GetResponse>;
}
