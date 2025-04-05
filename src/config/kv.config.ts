import Redis from "ioredis";
import consts from "../utils/consts";
import { parse, stringify } from "superjson";
import { getEnv } from "../utils/env";

const { expirationKey, zeroResult } = consts;
const { REDIS_HOST, REDIS_PORT } = getEnv();

export const kv = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

export default {
  get: async <T>(key: string) => {
    const value = await kv.get(key);
    if (!value) return null;
    return parse<T>(value);
  },
  set: async <T>(key: string, value: T, ttl?: number) => {
    if (ttl) return kv.set(key, stringify(value), expirationKey, ttl);
    await kv.set(key, stringify(value));
  },
  del: async (key: string) => {
    const res = await kv.del(key);
    return res > zeroResult;
  },
};
