import express, {Request, Response} from "express";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  logger.info("Hello, test!", {structuredData: true});
  res.send("Hello, test!");
});

exports.api = onRequest(app);
