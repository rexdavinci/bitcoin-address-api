import { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import { Logger } from "../../utils";

export const unknownEndpoint = (_: Request, response: Response) => {
  Logger.error("Unknown Endpoint");
  return response.status(404).send({ success: false, error: "Unknown Endpoint" });
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const errorHandler = (error: any, _: Request, response: Response, next: NextFunction) => {
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  const errorMessage = (error.message || error) as string;
  // error was because one or more public key supplied is invalid
  if (errorMessage.includes("of type isPoint, got Buffer")) {
    const message = errorMessage.substring(errorMessage.indexOf('"') + 1, errorMessage.lastIndexOf('"')); // extract the position of the public key
    const incorrectPubKey = message.split(".");
    const errorDetail = `Incorrect value for 'publicKeys' at index ${incorrectPubKey[1]}`;
    errorHandlerHelper(response, errorDetail);
  } else {
    errorHandlerHelper(response, errorMessage);
  }
  next(error);
};

export const rateLimiter = (limitRate: number) =>
  rateLimit({
    windowMs: 1 * 60 * 1000, //  minutes
    max: limitRate, // Limit each IP to defined number of calls
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
  });

const errorHandlerHelper = (response: Response, message: string) => {
  Logger.error(message);
  response.status(400).json({ success: false, error: message });
};
