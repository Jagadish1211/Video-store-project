import express from "express";
import multer from "multer";
import { uploadVideoToS3 } from "../s3Config/utils.ts";

const router = express.Router();

router.get("/:id", (req, res, next) => {
  const videoId = req.params.id;
  res.send(`Video ID requested: ${videoId}`);
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("video"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  await uploadVideoToS3(req, res);
});

export default router;
