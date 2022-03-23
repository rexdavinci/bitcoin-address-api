import * as winston from "winston";
import config from "../../config";

const transports = [];

if (config.env === "production") {
  transports.push(
    new winston.transports.File({ filename: "error.log", level: "error" }), // if in production, record errors to assist in debugging post-production errors
    new winston.transports.File({ filename: "combined.log" })
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

const Logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "bitcoin-wallet-api" },
  transports
});

export default Logger;
