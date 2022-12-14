const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fileStorage = multer.diskStorage({
  // Destination to store image
  destination: "media",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const fileUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|mp3)$/)) {
      return cb(new Error("Please upload a file"));
    }
    cb(undefined, true);
  },
});

app.get("/", (req, res) => {
  res.send("Multer File Server");
});

app.post(
  "/uploadImage",
  fileUpload.single("image"),
  (req, res) => {
    res.send(req.file);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.post(
  "/uploadAudio",
  fileUpload.single("audio"),
  (req, res) => {
    res.send(req.file);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
