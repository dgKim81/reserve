"use strict";
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info', // 로그 레벨
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(), // 콘솔에 로그 출력
        //new transports.File({ filename: 'app.log' }) // 파일에 로그 저장
    ]
});
module.exports = logger;
