import express, { Express } from 'express';
import * as AppControllers from './controllers/_controllers';
import authLoader from './loaders/auth.loader';
import { authenticateToken } from './middleware/auth.middleware';

function routes(app: Express) {
  const account = express();
  app.use('/account', account);
  authLoader(account);

  // Apply authentication middleware to following routes
  app.use('', authenticateToken);

  const exercises = express();
  app.use('/exercises', exercises);
  AppControllers.ExerciseController(exercises);

  const users = express();
  app.use('/users', users);
  AppControllers.UserController(users);

  const workouts = express();
  app.use('/workouts', workouts);
  AppControllers.WorkoutController(workouts);
};

export default routes;
