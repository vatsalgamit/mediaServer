const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
var fileupload = require("express-fileupload");
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileupload());

app.get("/", (req, res) => {
  res.send("File Server for OXICARE");
});

app.post("/getfile", async (req, res) => {
  const filePath = path.resolve(".", `media/${req.body.fileName}`);
  const fileBuffer = fs.readFileSync(filePath);
  res.send(fileBuffer);
});

app.post("/upload", function (req, res) {
  if (!req.files) {
    return res.status(400).send({
      message: "No files were uploaded",
    });
  }
  const file = req.files.foo;
  const path = __dirname + "/media/" + file.name;

  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: path });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
