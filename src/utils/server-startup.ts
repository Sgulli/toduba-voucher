import { logger } from "../config";
import { getEnv } from "./env";

const { PORT, HOST } = getEnv();

export function serverStartup() {
  logger.info({ name: "Server" }, `Running on http://${HOST}:${PORT}`);
}
