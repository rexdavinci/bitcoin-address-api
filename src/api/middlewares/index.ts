import { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import { Logger } from "../../utils";

export const unknownEndpoint = (_: Request, response: Response) => {
  Logger.error("Unknown Endpoint");
  return response.status(404).send({ success: false, message: "Unknown Endpoint" });
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const errorHandler = (error: any, _: Request, response: Response, next: NextFunction) => {
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  const errorMessage = (error.message || error) as string;
  Logger.error(errorMessage);
  response.status(400).json({ success: false, message: errorMessage });
  next(error);
};

export const rateLimiter = (limitRate: number) =>
  rateLimit({
    windowMs: 1 * 60 * 1000, //  minutes
    max: limitRate, // Limit each IP to defined number of calls
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
  });
