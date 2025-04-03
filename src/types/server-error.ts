export type ServerError = Error & {
  statusCode: number;
};
