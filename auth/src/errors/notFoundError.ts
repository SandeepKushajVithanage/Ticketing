import CustomError from "./customError";

class NotFoundError extends CustomError {
  statusCode = 500;
  reason = "Not found";

  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

export default NotFoundError;
