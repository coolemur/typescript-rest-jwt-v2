import express, { Application, Request, Response } from 'express';
import routes from 'routes';
import cookieParser from 'cookie-parser';

import {
  setAccessControlHeaders,
  refreshToken,
} from './misc';

export default function createServer() {
  const app: Application = express();

  app.use(express.json());
  app.use(setAccessControlHeaders);
  app.use(cookieParser());
  app.use(refreshToken);

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
  });

  app.use(routes);

  return app;
}
