import { Express, Request, Response } from 'express';
import { listWorkouts, createWorkout, readWorkout, updateWorkout, deleteWorkout } from '../services/workout.service';
import logger from '../utils/logger';

function workoutController(app: Express) {
  app.get('/', async (req: Request, res: Response) => {
    try {
      const workoutList = await listWorkouts();
      return res.send(workoutList);
    } catch (error: any) {
      logger.error(error);
      return res.status(409).send(error.message);
    }
  });

  app.post('/', async (req: Request, res: Response) => {
    try {
      const workoutData = await createWorkout(req.body);
      return res.send(workoutData);
    } catch (error: any) {
      logger.error(error);
      return res.status(409).send(error.message);
    }
  });

  app.get('/:id', async (req: Request, res: Response) => {
    try {
      const workoutData = await readWorkout(req.params.id);
      return res.send(workoutData);
    } catch (error: any) {
      logger.error(error);
      return res.status(409).send(error.message);
    }
  });

  app.put('/:id', async (req: Request, res: Response) => {
    try {
      const workoutData = await updateWorkout(req.params.id, req.body);
      return res.send(workoutData);
    } catch (error: any) {
      logger.error(error);
      return res.status(409).send(error.message);
    }
  });

  app.delete('/:id', async (req: Request, res: Response) => {
    try {
      const workoutData = await deleteWorkout(req.params.id);
      return res.send(workoutData);
    } catch (error: any) {
      logger.error(error);
      return res.status(409).send(error.message);
    }
  });
};

export default workoutController;
