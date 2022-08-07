import { config } from 'dotenv';

config();

export const {
  PORT,
  DB_URI,
  JWT_SECRET,
  SALT_ROUNDS,
} = process.env as {
  [key: string]: string;
};
