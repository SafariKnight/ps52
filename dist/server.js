"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 4000;
const dataPath = path_1.default.join(__dirname, "../data");
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(index_1.default);
app.use("/data", (_req, _res, next) => {
    if (!fs_1.default.existsSync(dataPath)) {
        fs_1.default.mkdirSync(dataPath);
    }
    next();
});
app.get("/data/:filename", (req, res, next) => {
    const { filename } = req.params;
    if (!fs_1.default.existsSync(path_1.default.join(dataPath, filename))) {
        res.status(404).json({ message: "File not found" });
    }
    next();
});
app.listen(port);
exports.default = app;
//# sourceMappingURL=server.js.map