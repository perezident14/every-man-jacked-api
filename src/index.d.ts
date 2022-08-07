declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_URI: string;
      JWT_SECRET: string;
      SALT_ROUNDS: string;
    }
  }
}

declare module 'cors';
declare module 'bcrypt';
declare module 'jsonwebtoken';

export { }
