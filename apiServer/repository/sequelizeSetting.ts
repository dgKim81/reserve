import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

import dotenv from 'dotenv';

/* 환경 설정 가져오기 */
const GetEnvPath = (): string => {
    let envPath;
    switch (process.env.NODE_ENV?.trim()) {
        case "test":
            envPath = ".env.test";
            break;
        case "production":
            envPath = ".env.production";
            break;
        default: // development
            envPath = ".env.development";
    }
    return envPath;
};

dotenv.config({ path: GetEnvPath() });

console.log(process.env.DATABASE_SSL );
const sequelizeConnection = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_USER_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  ssl:(/true/i).test(process.env.DATABASE_SSL || "true") ,
  clientMinMessages: 'notice',
});


export default sequelizeConnection;