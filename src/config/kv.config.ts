import Redis from "ioredis";
import { parse, stringify } from "superjson";

export const kv = new Redis();

export default {
  get: async <T>(key: string) => {
    const value = await kv.get(key);
    if (!value) return null;

    return parse<T>(value);
  },
  set: async <T>(key: string, value: T, ttl?: number) => {
    if (ttl) {
      await kv.set(key, stringify(value), "EX", ttl);
      return;
    }
    await kv.set(key, stringify(value));
  },
  del: async (key: string) => {
    const ZERO_RESULT = 0;
    const res = await kv.del(key);
    return res > ZERO_RESULT;
  },
};
