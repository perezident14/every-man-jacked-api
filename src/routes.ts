import express, { Express } from 'express';
import * as AppControllers from './controllers/_controllers';
import authLoader from './loaders/auth.loader';

function routes(app: Express) {
  const account = express();
  app.use('/account', account);
  authLoader(account);

  const exercises = express();
  app.use('/exercises', exercises);
  AppControllers.exerciseController(exercises);

  const users = express();
  app.use('/users', users);
  AppControllers.userController(users);

  const workouts = express();
  app.use('/workouts', workouts);
  AppControllers.workoutController(workouts);
};

export default routes;
