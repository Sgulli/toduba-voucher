namespace Express {
  interface Request {
    validated: {
      body?: any;
      query?: any;
      params?: any;
    };
    user: User & {
      id: string;
      email: string;
    };
  }
}
