const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("File Server for OXICARE");
});

app.post("/getfile", async (req, res) => {
  const filePath = path.resolve(".", `media/${req.body.fileName}`);
  const fileBuffer = fs.readFileSync(filePath);
  res.send(fileBuffer);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
