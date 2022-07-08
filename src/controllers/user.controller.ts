import { Express, Request, Response } from 'express';
import { listUsers, createUser, readUser, updateUser, deleteUser } from '../services/user.service';
import logger from '../utils/logger';

function userController(app: Express) {
  app.get('/', async (req: Request, res: Response) => {
    try {
      const userList = await listUsers();
      return res.send(userList);
    } catch (error: any) {
      logger.error(error);
      return res.status(409).send(error.message);
    }
  });

  app.post('/', async (req: Request, res: Response) => {
    try {
      const userData = await createUser(req.body);
      return res.send(userData);
    } catch (error: any) {
      logger.error(error);
      return res.status(409).send(error.message);
    }
  });

  app.get('/:id', async (req: Request, res: Response) => {
    try {
      const userData = await readUser(req.params.id);
      return res.send(userData);
    } catch (error: any) {
      logger.error(error);
      return res.status(409).send(error.message);
    }
  });

  app.put('/:id', async (req: Request, res: Response) => {
    try {
      const userData = await updateUser(req.params.id, req.body);
      return res.send(userData);
    } catch (error: any) {
      logger.error(error);
      return res.status(409).send(error.message);
    }
  });

  app.delete('/:id', async (req: Request, res: Response) => {
    try {
      const userData = await deleteUser(req.params.id);
      return res.send(userData);
    } catch (error: any) {
      logger.error(error);
      return res.status(409).send(error.message);
    }
  });
};

export default userController;
