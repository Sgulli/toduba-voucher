export const MESSAGES = {
  USER: {
    NOT_FOUND: "User not found",
    ALREADY_EXISTS: "User already exists",
    PASSWORD_MISMATCH: "Password mismatch",
  },
  PRODUCT: {
    NOT_FOUND: "Product not found",
    ALREADY_EXISTS: "Product already exists",
  },
  ORDER: {
    NOT_FOUND: "Order not found",
    ALREADY_EXISTS: "Order already exists",
  },
  AUTH: {
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
    INVALID_CREDENTIALS: "Invalid credentials",
    INVALID_PASSWORD: "Invalid password",
    INVALID_TOKEN: "Invalid token",
    TOKEN_EXPIRED: "Token expired",
  },
  SERVER: {
    INTERNAL_ERROR: "Internal server error",
    SERVER_INITIALIZED: "Server is up! :)",
  },
} as const;
