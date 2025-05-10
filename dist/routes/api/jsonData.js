"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonDataFolder = path_1.default.join(process.cwd(), "data");
const jsonData = express_1.default.Router();
const dataPath = path_1.default.join(__dirname, "../../../data");
jsonData.get("/data/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path_1.default.join(jsonDataFolder, filename + ".json");
    if (!fs_1.default.existsSync(filePath)) {
        res.status(404).json({ message: "File not found" });
        return;
    }
    const fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
    res.status(200).json(fileContent);
});
jsonData.post("/data/:filename", (req, res) => {
    try {
        const { filename } = req.params;
        if (!filename || typeof filename !== "string") {
            res
                .status(400)
                .json({ message: "File name is required and must be a string" });
            return;
        }
        const filePath = path_1.default.join(jsonDataFolder, filename + ".json");
        const data = req.body;
        fs_1.default.writeFileSync(filePath, JSON.stringify(data), "utf-8");
        res
            .status(201)
            .json({ message: "JSON file written successfully", filePath });
    }
    catch (e) {
        res
            .status(500)
            .json({ message: "Error writing JSON file", error: e.message });
    }
});
exports.default = jsonData;
//# sourceMappingURL=jsonData.js.map