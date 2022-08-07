import 'dotenv/config';
// import cors from 'cors';
import express from 'express';
import routes from './routes';
import connect from './utils/connect';
import logger from './utils/logger';

const cors = require('cors');

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://everymanjacked.com'],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const api = express();
app.use('/api', api);

app.get('/status-check', (req, res) => {
  res.status(200).send('Hello World! I am up and running!');
})

app.listen(process.env.PORT, async () => {
  logger.info(`App is running at http://localhost:${process.env.PORT}`);

  await connect();

  routes(api);
});
