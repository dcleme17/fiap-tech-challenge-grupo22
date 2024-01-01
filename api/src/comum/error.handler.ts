import { NextFunction, Request, Response } from "express";
import { CustomError } from "./custom.error";

export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof CustomError) {
    const { statusCode, message, errors } = error;
    return response.status(statusCode).send({ message, errors })
  }

  console.error(JSON.stringify(error, null, 2));
  return response.status(500).send({ message: "Ops! Algo deu errado :/", errors: [] });
};