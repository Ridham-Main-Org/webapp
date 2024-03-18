const winston = require('winston');

// Define transports for console and file logging
const consoleTransport = new winston.transports.Console();
const fileTransport = new winston.transports.File({ filename: 'logs/app.log' });

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp({
            format: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
        }),
    ),
    transports: [
        consoleTransport,
        fileTransport
    ]
});


module.exports = logger;
