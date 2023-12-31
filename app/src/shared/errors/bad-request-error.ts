import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;
  serializeErrors(): Array<{ message: string; field?: string }> {
    return [{ message: this.message }];
  }
}
