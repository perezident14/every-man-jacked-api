import { Express, Request, Response } from 'express';
import { listExercises, createExercise, readExercise, updateExercise, deleteExercise } from '../services/exercise.service';
import { errorParser } from '../utils/error.parser';
import logger from '../utils/logger';

function exerciseController(app: Express) {
  app.get('/', async (req: Request, res: Response) => {
    try {
      const data = await listExercises();
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.post('/', async (req: Request, res: Response) => {
    try {
      const data = await createExercise(req.body);
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.get('/:id', async (req: Request, res: Response) => {
    try {
      const data = await readExercise(req.params.id);
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.put('/:id', async (req: Request, res: Response) => {
    try {
      const data = await updateExercise(req.params.id, req.body);
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });

  app.delete('/:id', async (req: Request, res: Response) => {
    try {
      const data = await deleteExercise(req.params.id);
      return res.send(data);
    } catch (error: any) {
      logger.error(error);
      const parsed = errorParser(error);
      return res.status(parsed.status).send(parsed.message);
    }
  });
};

export default exerciseController;
