import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./index.ts";
import type { MulterFile } from "../types/index.ts";
import type { Request, Response } from "express";

export const uploadVideoToS3 = async (
  req: Request,
  res: Response,
) => {
  const file = req.file as MulterFile;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME ?? "",
    Key: file.originalname,
    Body: file.buffer,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));

    res.json({
      message: "Video uploaded to S3 successfully!",
      filename: file.originalname,
    });
  } catch (error) {
    console.error("Error uploading video:", error, { uploadParams: { Bucket: uploadParams.Bucket, Key: uploadParams.Key } });
    return res.status(500).json({ message: "Failed to upload video to S3", error: (error as any)?.message ?? String(error) });
  }
};
