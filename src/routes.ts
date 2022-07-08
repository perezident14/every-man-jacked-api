import express, { Express } from 'express';
import userController from './controllers/user.controller';
import workoutController from './controllers/workout.controller';

function routes(app: Express) {
  const users = express();
  app.use('/api/users', users);
  userController(users);

  const workouts = express();
  app.use('/api/workouts', workouts);
  workoutController(workouts);
};

export default routes;
