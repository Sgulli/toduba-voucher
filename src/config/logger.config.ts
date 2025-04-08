import pino from "pino";
import pinoHttp from "pino-http";

const serializers: Record<string, pino.SerializerFn> = {
  err: pino.stdSerializers.err,
  req: () => undefined,
  res: () => undefined,
};

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
  serializers,
});

export const httpLogger = pinoHttp({
  logger,
  autoLogging: false,
  serializers,
});
