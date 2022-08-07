import { Express, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as config from '../config';
import { UserRole } from '../models/user.model';
import { createUser, loginUser, readUser } from '../services/user.service';
import { errorParser } from '../utils/error.parser';
import logger from '../utils/logger';

function authLoader(app: Express) {
  app.post('/admin/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const authenticate = await loginUser(email, password);
      if (authenticate.user.role !== UserRole.ADMIN) {
        throw new Error('User Not Permitted');
      }
      return res.send(authenticate);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const authenticate = await loginUser(email, password);
      return res.send(authenticate);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.get('/logout', async (req: Request, res: Response) => {
    return res.status(204).send('');
  });

  app.post('/refresh', async (req: Request, res: Response) => {
    const data = req.body

    if (!data.refreshToken) {
      return res.status(401).send('Invalid Refresh Token');
    }

    jwt.verify(data.refreshToken, config.JWT_SECRET, async (error: any, user: any) => {
      if (error) {
        return res.status(403).send('Expired Refresh Token');
      }

      const payload = await readUser(user._id);
      const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: 3600 });
      const refresh = jwt.sign(payload, config.JWT_SECRET, { expiresIn: 86400 });
    
      const AuthenticationResult = {
        AccessToken: token,
        RefreshToken: refresh,
      };

      return res.send({ AuthenticationResult, user: payload });
    });
  });

  app.post('/register', async (req: Request, res: Response) => {
    try {
      const user = req.body;
      await createUser(user);
      const authenticate = await loginUser(user.email, user.password);
      return res.send(authenticate);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });
};

export default authLoader;
