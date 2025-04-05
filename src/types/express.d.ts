namespace Express {
  interface Request {
    validated: {
      body?: any;
      query?: any;
      params?: any;
    };
  }
}
