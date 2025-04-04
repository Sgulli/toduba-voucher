export const MESSAGES = {
  USER: {
    NOT_FOUND: "User not found",
    ALREADY_EXISTS: "User already exists",
    PASSWORD_MISMATCH: "Password mismatch",
  },
  PRODUCT: {
    NOT_FOUND: "Product not found",
    ALREADY_EXISTS: "Product already exists",
    INVALID_PRICE: "Invalid price",
    INVALID_CURRENCY: "Invalid currency",
  },
  ORDER: {
    NOT_FOUND: "Order not found",
    ALREADY_EXISTS: "Order already exists",
    INVALID_STATUS: "Invalid order status",
    INVALID_QUANTITY: "Invalid quantity",
    INVALID_LINE_ITEM: "Invalid line item",
    INVALID_TOTAL: "Invalid total amount",
    INVALID_CURRENCY: "Invalid currency",
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
  PRICE: {
    NOT_FOUND: "Price not found",
    ALREADY_EXISTS: "Price already exists",
    INVALID_AMOUNT: "Invalid amount",
    INVALID_CURRENCY: "Invalid currency",
    CURRENCY_DONT_MATCH: "Price and product do not match",
  },
  LINE_ITEM: {
    NOT_FOUND: "Line item not found",
    ALREADY_EXISTS: "Line item already exists",
    INVALID_QUANTITY: "Invalid quantity",
    INVALID_PRODUCT: "Invalid product",
    REQUIRED: "Line item is required",
  },
  ASSETS: {
    FILE_REQUIRED: "File is required",
  },
} as const;
