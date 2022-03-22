import express, { Request, Response } from "express";
import helmet from "helmet";
import compression from "compression";
import config from "../config";
import { Logger } from "../utils";
import { rateLimiter, errorHandler, unknownEndpoint } from "./middlewares";
import router from "./routes";

const app = express();

app.use(rateLimiter(config.limitRate));
app.enable("trust proxy");
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get the status of the server
app.get("/ping", (_: Request, res: Response) => {
  res.status(200).json({ success: true, message: "pong" });
});

app.use("/api", router());

app.use(errorHandler);
app.use(unknownEndpoint);

const initServer = () => {
  try {
    app.listen(config.port, (): void => {
      Logger.info(`Service Listening ::${config.port}`);
    });
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
};

export { app, initServer };
