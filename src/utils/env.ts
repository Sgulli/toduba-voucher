import { z } from "zod";

const env = z.object({
  DATABASE_URL: z.string(),
  MIN_SALT_LENGTH: z.string().transform((val) => parseInt(val, 10)),
  MIN_PASSWORD_LENGTH: z.string().transform((val) => parseInt(val, 10)),
  HOST: z.string(),
  PORT: z.string().transform((val) => parseInt(val, 10)),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(["development", "production", "test"]),
  SUPABASE_URL: z.string(),
  SUPABASE_API_KEY: z.string(),
  BUCKET_NAME: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform((val) => parseInt(val, 10)),
});

export const getEnv = () => {
  const result = env.safeParse(process.env);

  if (!result.success) {
    console.error("Invalid environment variables", result.error.format());
    throw new Error("Invalid environment variables");
  }

  return result.data;
};
