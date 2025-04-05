import multer from "multer";

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export const useUpload = (fieldName: string) => upload.single(fieldName);

export default upload;
