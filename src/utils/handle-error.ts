import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ServerError } from "./errors";
import { logger } from "../config";
import { Response } from "./response";
import { HTTP_STATUS } from "./http-status";

export const handleError = (error: unknown) => {
  if (error instanceof ServerError && "statusCode" in error) {
    logger.error({ name: "Server" }, error.message);
    const apiError = Response.error(
      error.message,
      error.statusCode,
      error.cause as string | undefined
    );

    return apiError;
  }

  if (error instanceof PrismaClientKnownRequestError) {
    logger.error({ name: "Server" }, error.message);
    const apiError = Response.error(
      error.message,
      HTTP_STATUS.BAD_REQUEST,
      error.cause as string | undefined
    );

    return apiError;
  }

  if (error instanceof Error) {
    logger.error({ name: "Server" }, error.message);
    const apiError = Response.error(
      error.message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error.cause as string | undefined
    );

    return apiError;
  }

  // Handle unknown error
  logger.error({ name: "Server" }, "Unknown error occurred");
  const apiError = Response.error(
    "Unknown error occurred",
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
  return apiError;
};
