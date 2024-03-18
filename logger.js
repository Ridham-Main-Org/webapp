const winston = require('winston');

// Define transports for console and file logging
const consoleTransport = new winston.transports.Console();

const dotenv = require('dotenv');
dotenv.config({ path: __dirname + "/.env" });


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp({
            format: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
        }),
    )
});

if (process.env.NODE_ENV === 'testing') {
    logger.add(consoleTransport);
} else {
    logger.add(new winston.transports.File({ filename: '/var/webapp/myapp.log' }));
}

module.exports = logger;
