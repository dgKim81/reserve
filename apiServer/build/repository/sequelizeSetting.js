"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const postgres_1 = require("@sequelize/postgres");
const dotenv_1 = __importDefault(require("dotenv"));
/* 환경 설정 가져오기 */
const GetEnvPath = () => {
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
dotenv_1.default.config({ path: GetEnvPath() });
console.log(process.env.DATABASE_SSL);
const sequelizeConnection = new core_1.Sequelize({
    dialect: postgres_1.PostgresDialect,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_USER_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "5432"),
    ssl: (/true/i).test(process.env.DATABASE_SSL || "true"),
    clientMinMessages: 'notice',
});
exports.default = sequelizeConnection;
