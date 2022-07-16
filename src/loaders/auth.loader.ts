import { Express, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, loginUser, readUser } from '../services/user.service';
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

  app.post('/refresh', async (req: Request, res: Response) => {
    const data = req.body

    if (!data.refreshToken) {
      return res.status(401).send('Invalid Refresh Token');
    }

    jwt.verify(data.refreshToken, process.env.JWT_SECRET, async (error: any, user: any) => {
      if (error) {
        console.log(error);
        return res.status(403).send('Expired Refresh Token');
      }

      const payload = await readUser(user._id);
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
      const refresh = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 });
    
      const AuthenticationResult = {
        AccessToken: token,
        RefreshToken: refresh,
      };

      return res.send({ AuthenticationResult, user: payload });
    });
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
