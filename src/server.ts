import express, { Application, Request, Response } from 'express';
import routes from 'routes';
import cookieParser from 'cookie-parser';

import { setAccessControlHeaders, refreshToken } from './misc';

import swaggerUI from 'swagger-ui-express';
import * as swaggerFile from './swagger_output.json';

export default function createServer() {
  const app: Application = express();

  app.use(express.json());
  app.use(setAccessControlHeaders);
  app.use(cookieParser());
  app.use(refreshToken);

  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));

  app.use(routes);

  return app;
}
