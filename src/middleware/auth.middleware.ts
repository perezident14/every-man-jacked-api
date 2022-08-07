import { NextFunction, Request, Response } from 'express';
import Config from '../config';
import logger from '../utils/logger';

const jwt = require('jsonwebtoken');

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ').pop();

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, Config.JWT_SECRET, (error: any, user: any) => {
    if (error) {
      logger.error(error);
      return res.status(403);
    }

    (req as any).user = user;

    next();
  });
};
