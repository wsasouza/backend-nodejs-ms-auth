import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from 'models/errors/database.error.model';

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof DatabaseError) {
    res.status(StatusCodes.BAD_REQUEST).send();
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

export default errorHandler;