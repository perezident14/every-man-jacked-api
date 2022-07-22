import { Express, Request, Response } from 'express';
import { listWorkouts, createWorkout, readWorkout, updateWorkout, deleteWorkout } from '../services/workout.service';
import { errorParser } from '../utils/error.parser';
import logger from '../utils/logger';

function workoutController(app: Express) {
  app.get('/', async (req: Request, res: Response) => {
    try {
      const data = await listWorkouts();
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.post('/', async (req: Request, res: Response) => {
    try {
      const data = await createWorkout(req.body);
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.get('/:id', async (req: Request, res: Response) => {
    try {
      const data = await readWorkout(req.params.id);
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.put('/:id', async (req: Request, res: Response) => {
    try {
      const data = await updateWorkout(req.params.id, req.body);
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.delete('/:id', async (req: Request, res: Response) => {
    try {
      const data = await deleteWorkout(req.params.id);
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });
};

export default workoutController;
