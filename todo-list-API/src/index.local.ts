import express from "express";
import * as logger from "firebase-functions/logger";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:4200"],
  credentials: true,
}));

app.use("/api", routes);
logger.info("Routes imported");

const port = process.env.PORT || 8080;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

