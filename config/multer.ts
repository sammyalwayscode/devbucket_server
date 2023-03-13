import multer from "multer";
import { Request } from "express";
import path from "path";

type destinationCallBack = (error: Error | null, destination: string) => void;
type fileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination(
    req: Request,
    file: Express.Multer.File,
    callback: destinationCallBack
  ) {
    callback(null, "uploads");
  },

  filename(
    req: Request,
    file: Express.Multer.File,
    callback: fileNameCallback
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

export const avatarUpload = multer({ storage: storage }).single("avatar");
