"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonData_1 = __importDefault(require("./api/jsonData"));
const routes = express_1.default.Router();
routes.use(jsonData_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map