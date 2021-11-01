import { Router, Request, Response } from 'express';
import * as db from '../db';
import { getToken } from '../misc';

const router = Router();

const config = {
  'jwtExpiresIn': 50000
};

router.post('/register', (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Email and password are required'
    });
  }

  const user = db.saveUser(req.body.email, req.body.password);

  if (!user) {
    return res.status(403).json({
      message: 'User already exists'
    });
  }

  return res.json(user);
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    });
  }

  const user: Partial<User> | null = db.getUser(email, password);

  if (!user) {
    return res.status(403).json({
      message: 'Invalid email or password'
    });
  }

  const token = await getToken(user);
  res.cookie('JWT', token, { httpOnly: true, maxAge: config.jwtExpiresIn });
  return res.json(user);
});



export default router;
