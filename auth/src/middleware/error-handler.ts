import {Request, Response, NextFunction} from 'express';
import { CustomError } from '../Errors/custom-error';

export const errorHandler = (
  error:Error,
  req:Request,
  res:Response,
  next:NextFunction) => {
    console.log("Tye of", typeof error);
    if(error instanceof CustomError){
      return res.status(error.statusCode).send({errors: error.serializeErrors()});
    }

    return res.status(400).send({errors:[{message: 'Something went wrong'}]});
  }