import express from "express";
import jsonData from "./api/jsonData";

const routes = express.Router();

routes.use(jsonData);

export default routes;
