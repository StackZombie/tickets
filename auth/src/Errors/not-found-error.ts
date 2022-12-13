import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  constructor(){
    super();
    Object.setPrototypeOf(this, NotFoundError);
  }

  serializeErrors() {
      return [{
        message:"Not Found"
      }]
  }
};