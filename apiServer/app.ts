import { Sequelize } from '@sequelize/core';
import * as dotenv from "dotenv";
import express from "express";
import sequelizeConnection from './repository/sequelizeSetting';

const logger = require('./logger');

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


/* 포트 설정 */
const app = express();
app.set("port", process.env.PORT || 3000);

/* 라우트 설정 */

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번에서 대기중");
});

/* 데이터베이스 설정 */
assertDatabaseConnection(sequelizeConnection);

async function assertDatabaseConnection(database:Sequelize): Promise<void> {
    try {
	    await database.authenticate();
	    await database.sync();
	    logger.info('Connection has been established successfully.');
    } catch (error) {
	    logger.error('Unable to connect to the database:', error);
    }
}