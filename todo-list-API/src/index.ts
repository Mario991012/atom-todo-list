import express from "express";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use("/api", routes);
logger.info("Routes imported");

if (process.env.ENV === "local") {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
}
exports.api = onRequest(app);
