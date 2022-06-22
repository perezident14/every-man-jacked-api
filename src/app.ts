import express from 'express';
import routes from './routes';
import connect from './utils/connect';
import logger from './utils/logger';
import 'dotenv/config';

const app = express();

app.listen(process.env.PORT, async () => {
  logger.info(`App is running at http://localhost:${process.env.PORT}`);

  await connect();

  routes(app);
});
