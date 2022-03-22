import * as dotenv from "dotenv";

dotenv.config(); // initialize dotenv

const config = {
  port: process.env.PORT as string, // port where application is currently being served
  env: process.env.NODE_ENV as string, // current environment
  logLevel: process.env.LOG_LEVEL,
  limitRate: Number(process.env.LIMIT_RATE)
};

export default config;
