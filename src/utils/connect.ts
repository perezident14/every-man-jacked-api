import mongoose from 'mongoose';
import * as config from '../config'
import logger from './logger';

async function connect() {
  try {
    await mongoose.connect(config.DB_URI);
    logger.info('Connected to DB');
  } catch {
    logger.error('Could not connect to DB');
    process.exit(1);
  }
}

export default connect;
