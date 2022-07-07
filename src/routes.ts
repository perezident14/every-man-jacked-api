import { Express, Request, Response } from 'express';
import { createUserHandler, readUserHandler } from './controllers/user.controller';

function routes(app: Express) {
  app.get('/health-check', (req: Request, res: Response) => res.send(200));

  app.post('/api/users', createUserHandler);
  app.get('/api/users', readUserHandler);
};

export default routes;
