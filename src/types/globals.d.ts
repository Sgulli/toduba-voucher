namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    MIN_SALT_LENGTH: string;
    MIN_PASSWORD_LENGTH: string;
    HOST: string;
    PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    NODE_ENV: "development" | "production" | "test";
    SUPABASE_URL: string;
    SUPABASE_API_KEY: string;
    BUCKET_NAME: string;
  }
}
