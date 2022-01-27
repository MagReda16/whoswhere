declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    PORT: string;
    CORS_ORIGIN: string,
    DB_URL: string,
    JWT_SECRET: string
  }
}


declare namespace Express {
    interface Request {
        user: any
    }
}
