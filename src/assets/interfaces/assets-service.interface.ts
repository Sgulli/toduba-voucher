import { Asset } from "@prisma/client";
import { GetResponse } from "../types/get-response.type";
import { FileData } from "../types/file-data.type";

export interface IAssetsService {
  bucket: string;
  upload: (
    productId: string,
    fileData?: FileData,
    file?: Express.Multer.File
  ) => Promise<Asset>;
  get: (id: string) => Promise<GetResponse>;
}
