import { ValidationError } from "express-validator";
import CustomError from "./customError";

class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const errors = this.errors.map((error: any) => ({
      message: error.msg,
      field: error.path,
    }));
    return errors;
  }
}
export default RequestValidationError;
