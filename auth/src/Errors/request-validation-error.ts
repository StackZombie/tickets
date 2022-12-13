import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
export class RequestValidationError extends CustomError {
  statusCode=400;
  constructor(public errors: ValidationError[]){
      super();

      // Only because we are extending a built in class 
      Object.setPrototypeOf(this,RequestValidationError.prototype);
  }

  serializeErrors(){
    return this.errors.map(error => {
      return {
        field: error.param,
        message: error.msg
      }
  })
}
}