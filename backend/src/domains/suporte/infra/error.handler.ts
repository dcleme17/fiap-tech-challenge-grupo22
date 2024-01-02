import { NextFunction, Request, Response } from "express";
import { CustomError } from "../entities/custom.error";
import { CustomResponse } from "../entities/custom.response";

export const errorHandler = (error: Error, _request: Request, response: Response, _next: NextFunction) => {
  
  if (error instanceof CustomResponse) {
    const { statusCode, message, content, logging } = error;
    if (logging) console.info(error)
    return response.status(statusCode).send({ statusCode, message, content })
  } else if(error instanceof CustomError) {
    const { statusCode, message, errors, logging} = error
    if (logging) console.error(error)
    return response.status(statusCode).send({ statusCode, message, errors })
  }

  console.error(JSON.stringify(error, null, 2));
  return response.status(500).send({ message: "Ops! Algo deu errado :/", errors: [] });
};