import express, { Express, Request, Response } from 'express';
import userController from './controllers/user.controller';

function routes(app: Express) {
  app.get('/health-check', (req: Request, res: Response) => res.send(200));

  const users = express();
  app.use('/api/users', users);
  userController(users);
};

export default routes;
