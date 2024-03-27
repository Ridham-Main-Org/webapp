const winston = require('winston');

// Define transports for console and file logging
// const consoleTransport = new winston.transports.Console();

const dotenv = require('dotenv');
const { Logform } = require('winston');
dotenv.config({ path: __dirname + "/.env" });

let logTransports;

if (process.env.NODE_ENV === 'testing') {
    logTransports = new winston.transports.Console();
} else {
    logTransports = new winston.transports.File({ filename: '/var/log/webapp/myapp.log' });
}

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp(),
    ),
    transports: [logTransports]
});

module.exports = logger;
