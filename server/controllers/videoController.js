const express = require("express");
const { promisify } = require("util");
const { stat, createReadStream } = require("fs");

const videos = require("../mockData");

const router = express.Router();

// get list of video
router.get("/", (req, res) => {
  res.json(videos);
});

// make request for a particular video
router.get("/:name/data", (req, res) => {
  const name = req.params.name;
  res.json(videos[name]);
});

router.get("/:name", async (req, res) => {
  const videoPath = `assets/${req.params.name}.mp4`;
  const fileInfo = promisify(stat);
  const { size } = await fileInfo(videoPath);
  const videoRange = req.headers.range;

  if (videoRange) {
    const parts = videoRange.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
    const chunksize = end - start + 1;
    const file = createReadStream(videoPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Type": "video/mp4",
      "Content-Length": size,
    };
    res.writeHead(200, head);
    createReadStream(videoPath).pipe(res);
  }
});
const captionPath = "/home/youssef/backend/node/streaming-app/server";
router.get("/:name/caption", (req, res) =>
  res.sendFile(`assets/captions/${req.params.name}.vtt`, { root: captionPath })
);

module.exports = { router };
