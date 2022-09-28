import express from 'express';
import jwt from 'jsonwebtoken';
import config from './config.json';

export function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const jwtCookie = req.cookies.JWT;

  jwt.verify(jwtCookie, 'secretkey', (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      res.sendStatus(403);
    } else {
      req.authData = decoded;
      next();
    }
  });
}

export function getToken(user: Partial<User>): Promise<string|undefined> {
  return new Promise((resolve, reject) => {
    jwt.sign(user, 'secretkey', { expiresIn: config.jwtExpiresIn / 1000 }, (err: Error | null, token: string | undefined) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

export function setAccessControlHeaders(req: express.Request, res: express.Response, next: express.NextFunction): void {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
}

export function refreshToken(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const jwtCookie = req.cookies.JWT;
  const jwtData = jwt.decode(jwtCookie);

  if (jwtData && req.url !== '/api/login' && req.url !== '/api/register') {
    jwt.verify(jwtCookie, 'secretkey', (err: jwt.VerifyErrors | null, authData: any) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.cookie('JWT', null);
        }
      } else {
        const newAuthData = Object.assign({}, authData);
        delete newAuthData.exp;
        delete newAuthData.iat;

        const newToken = jwt.sign(newAuthData, 'secretkey', { expiresIn: config.jwtExpiresIn / 1000 });
        res.cookie('JWT', newToken);
      }
    });
  }

  next();
}
