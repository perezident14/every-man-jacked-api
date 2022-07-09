import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ').pop();

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (error: any, user: any) => {
    console.log(error)

    if (error) {
      return res.sendStatus(403);
    }

    (req as any).user = user;

    next();
  })
};
