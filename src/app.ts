import 'dotenv/config';
import express from 'express';
import routes from './routes';
import connect from './utils/connect';
import logger from './utils/logger';

const app = express();

app.use(express.json());

app.listen(process.env.PORT, async () => {
  logger.info(`App is running at http://localhost:${process.env.PORT}`);

  await connect();

  routes(app);
});
