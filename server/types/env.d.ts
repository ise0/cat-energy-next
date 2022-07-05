declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development';
    DATABASE: string;
    DATABASE_PASSWORD: string;
    PORT: string
  }
}
