import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser } from '../services/user.service';
import logger from '../utils/logger';

export async function createUserHandler(req: Request, res: Response) {
  try {
    const userData = await createUser(req.body);
    const user = omit(userData.toJSON(), 'password');
    return res.send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};
