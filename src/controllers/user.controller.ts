import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser, readUser } from '../services/user.service';
import logger from '../utils/logger';

export async function createUserHandler(req: Request, res: Response) {
  try {
    const userData = await createUser(req.body);
    return res.send(userData);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

export async function readUserHandler(req: Request, res: Response) {
  try {
    const userData = await readUser(req.body.id);
    return res.send(userData);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};
