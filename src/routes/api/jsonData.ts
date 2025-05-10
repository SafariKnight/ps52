import { Request, Response } from "express";
import express from "express";
import fs from "fs";
import path from "path";

const jsonDataFolder = path.join(process.cwd(), "data");
const jsonData = express.Router();

const dataPath = path.join(__dirname, "../../../data");

jsonData.get("/data/:filename", (req: Request, res: Response) => {
  const { filename } = req.params;

  const filePath = path.join(jsonDataFolder, filename + ".json");

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ message: "File not found" });
    return;
  }

  const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  res.status(200).json(fileContent);
});

jsonData.post("/data/:filename", (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    if (!filename || typeof filename !== "string") {
      res
        .status(400)
        .json({ message: "File name is required and must be a string" });
      return;
    }
    const filePath = path.join(jsonDataFolder, filename + ".json");
    const data = req.body;
    fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");

    res
      .status(201)
      .json({ message: "JSON file written successfully", filePath });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error writing JSON file", error: e.message });
  }
});

export default jsonData;
