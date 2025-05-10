import express from "express";
import routes from "./routes/index";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const app = express();
const port = 4000;
const dataPath = path.join(__dirname, "../data");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.use("/data", (_req, _res, next) => {
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
  }
  next();
});

app.get("/data/:filename", (req, res, next) => {
  const { filename } = req.params;
  if (!fs.existsSync(path.join(dataPath, filename))) {
    res.status(404).json({ message: "File not found" });
  }
  next();
});

app.listen(port);

export default app;
