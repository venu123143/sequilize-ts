
import dotenv from 'dotenv';

dotenv.config();

interface Config {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql';
  port: number;
  timezone: string;
}

interface DBConfig {
  development: Config;
  test: Config;
  production: Config;
}

const dbConfig: DBConfig = {
  development: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT!, 10),
    timezone: '+00:00',
  },
  test: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT!, 10),
    timezone: '+00:00',
  },
  production: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT!, 10),
    timezone: '+00:00',
  },
};

export = dbConfig;
