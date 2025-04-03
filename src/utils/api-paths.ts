export const API_PATHS = {
  AUTH: {
    SIGN_IN: "/auth/signin",
    SIGN_UP: "/auth/signup",
    ME: "/auth/me",
  },
  USERS: {
    GET: "/users/:id",
    GET_ALL: "/users",
    CREATE: "/users",
    UPDATE: "/users/:id",
    DELETE: "/users/:id",
  },
  PRODUCTS: {
    GET: "/products/:id",
    GET_ALL: "/products",
    CREATE: "/products",
    UPDATE: "/products/:id",
    DELETE: "/products/:id",
  },
  ASSETS: {
    UPLOAD: "/assets/upload",
    GET: "/assets/:id",
  },
  PRICES: {
    GET: "/prices/:id",
    GET_ALL: "/prices",
    CREATE: "/prices",
    UPDATE: "/prices/:id",
    DELETE: "/prices/:id",
  },
  ORDERS: {
    GET: "/orders/:id",
    GET_ALL: "/orders",
    CREATE: "/orders",
    UPDATE: "/orders/:id",
    DELETE: "/orders/:id",
  },
} as const;
