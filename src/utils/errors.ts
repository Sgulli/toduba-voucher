import { HTTP_STATUS } from "./http-status";

export class ValidationError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message.trim());
    this.name = "ValidationError";
    this.statusCode = HTTP_STATUS.BAD_GATEWAY;
  }
}

export class NotFoundError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message.trim());
    this.name = "NotFoundError";
    this.statusCode = HTTP_STATUS.NOT_FOUND;
  }
}

export class UnauthorizedError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message.trim());
    this.name = "UnauthorizedError";
    this.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }
}

export class ConflictError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message.trim());
    this.name = "ConflictError";
    this.statusCode = HTTP_STATUS.CONFLICT;
  }
}
