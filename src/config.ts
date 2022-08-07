import { config } from 'dotenv';

config();

const {
  PORT,
  DB_URI,
  JWT_SECRET,
  SALT_ROUNDS
} = process.env as { [key: string]: string };

const Config = {
  PORT,
  DB_URI,
  JWT_SECRET,
  SALT_ROUNDS,
}

export default Config;
