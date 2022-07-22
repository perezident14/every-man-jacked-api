import { Express, Request, Response } from 'express';
import { listUsers, createUser, readUser, updateUser, deleteUser } from '../services/user.service';
import { errorParser } from '../utils/error.parser';
import logger from '../utils/logger';

function userController(app: Express) {
  app.get('/', async (req: Request, res: Response) => {
    try {
      const data = await listUsers();
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.post('/', async (req: Request, res: Response) => {
    try {
      const data = await createUser(req.body);
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.get('/:id', async (req: Request, res: Response) => {
    try {
      const data = await readUser(req.params.id);
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.put('/:id', async (req: Request, res: Response) => {
    try {
      const data = await updateUser(req.params.id, req.body);
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.delete('/:id', async (req: Request, res: Response) => {
    try {
      const data = await deleteUser(req.params.id);
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });
};

export default userController;
