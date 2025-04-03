// utils/ApiResponse.ts

export class ServiceResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: ServiceError | undefined;

  constructor(
    success: boolean,
    message: string,
    data: T | null = null,
    error: ServiceError | undefined = undefined
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}

export class ServiceError {
  code: number;
  details: string;

  constructor(code: number, details: string) {
    this.code = code;
    this.details = details;
  }
}

export class Response {
  static success<T>(data: T, message?: string): ServiceResponse<T> {
    return new ServiceResponse<T>(true, message ?? "ok", data);
  }

  static error(
    message: string,
    code: number,
    details?: string
  ): ServiceResponse<null> {
    return new ServiceResponse<null>(
      false,
      message,
      null,
      new ServiceError(code, details ?? message)
    );
  }
}
