import { Express, Request, Response } from 'express';
import { createUserHandler } from './controllers/user.controller';
import validate from './middleware/validateResource';
import { createUserSchema } from './schemas/user.schema';

function routes(app: Express) {
  app.get('/health-check', (req: Request, res: Response) => res.send(200));

  app.post('/api/users', validate(createUserSchema), createUserHandler)
};

export default routes;
