import express from "express";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
  origin: ["https://atom-angular-todo.web.app"],
  credentials: true,
}));


app.use("/api", routes);
logger.info("Routes imported");

logger.info("Running on Cloud Functions, no need to manually start server.");
exports.api = onRequest(app);
