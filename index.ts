import express from "express";
import dotenv from "dotenv";
import videosRouter from "./routes/videos.ts";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, welcome to the Youtube Lite app!");
});

app.use("/videos", videosRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
