declare module 'bcrypt';
declare module 'cors';
declare module 'jsonwebtoken';

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

export { }
