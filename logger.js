const winston = require('winston');

// Define transports for console and file logging
const consoleTransport = new winston.transports.Console();

const dotenv = require('dotenv');
dotenv.config({ path: __dirname + "/.env" });


const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp({
            format: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
        }),
        // winston.format.printf(
        //     ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
        // ),
        winston.format.printf(info => {
            return JSON.stringify({ level: info.level, time: info.timestamp, message: info.message });
        })
    )
});

if (process.env.NODE_ENV === 'testing') {
    logger.add(consoleTransport);
} else {
    logger.add(new winston.transports.File({ filename: '/var/log/webapp/myapp.log' }));
}

module.exports = logger;
