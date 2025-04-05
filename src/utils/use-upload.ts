import upload from "../config/multer.config";

export const useUpload = (fieldName: string) => upload.single(fieldName);
