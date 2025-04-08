import { logger } from "../config";
import { getEnv } from "./env";

const { PORT, HOST } = getEnv();

export function serverStartupLog() {
  logger.info({ name: "Server" }, `Running on http://${HOST}:${PORT}`);
}
