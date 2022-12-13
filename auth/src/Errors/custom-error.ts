export abstract class CustomError extends Error {
   abstract statusCode:number;
   abstract serializeErrors():{field?:string, message:string}[]
   constructor(){
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
   }
};