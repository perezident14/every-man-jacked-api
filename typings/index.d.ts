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

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
