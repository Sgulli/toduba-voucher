import { GetResponse } from "../types/get-response.type";
import { type UploadResponse } from "../types/upload-response.type";

export interface IAssetsService {
  bucket: string;
  upload: (
    productId: string,
    alt?: string,
    file?: Express.Multer.File
  ) => Promise<UploadResponse>;
  get: (id: string) => Promise<GetResponse>;
}
