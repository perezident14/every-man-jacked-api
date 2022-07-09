import { Express, Request, Response } from 'express';
import { createUser, loginUser } from '../services/user.service';
import logger from '../utils/logger';

function authLoader(app: Express) {
  app.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const authenticate = await loginUser(email, password);
      return res.send(authenticate);
    } catch (error: any) {
      logger.error(error);
      return res.status(409).send(error.message);
    }
  });

  app.get('/logout', async (req: Request, res: Response) => {
    return res.status(204).send('');
  });

  app.post('/register', async (req: Request, res: Response) => {
    try {
      const user = await createUser(req.body);
      return res.send(user);
    } catch (error: any) {
      logger.error(error);
      return res.status(409).send(error.message);
    }
  });
};

export default authLoader;
