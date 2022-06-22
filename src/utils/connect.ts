import mongoose from 'mongoose';
import logger from './logger';
import 'dotenv/config';

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI);
    logger.info('Connected to DB');
  } catch {
    logger.error('Could not connect to DB');
    process.exit(1);
  }
}

export default connect;
