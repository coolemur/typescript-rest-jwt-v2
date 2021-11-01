declare namespace Express {
  interface Request {
    token: string;
    authData: any;
  }
}