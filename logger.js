const { createLogger, transports, format } = require('winston');

const dotenv = require('dotenv');
dotenv.config({ path: __dirname + "/.env" });
 
let loggerInstance = null;
let envType = process.env.NODE_ENV || '';
 
function initializeLogger() {
  let logTransport;
  let logFormat;
 
  if (process.env.NODE_ENV === 'testing') {
    logTransport = new transports.Console();
    logFormat = format.json();
  } else {
    logTransport = new transports.File({ filename: '/var/log/webapp/myapp.log' });
    logFormat = format.combine(
      format.timestamp(),
      format.json()
    );
  }
 
  return createLogger({
    level: 'debug',
    format: logFormat,
    transports: [logTransport]
  });
}
 
function getLogger() {
  if (!loggerInstance) {
    loggerInstance = initializeLogger(envType);
  }
  return loggerInstance;
}

module.exports = getLogger;


// const winston = require('winston');

// // Define transports for console and file logging
// // const consoleTransport = new winston.transports.Console();

// const dotenv = require('dotenv');
// dotenv.config({ path: __dirname + "/.env" });

// let logTransports;
// let logFormat;

// if (process.env.NODE_ENV === 'testing') {
//     logTransports = new winston.transports.Console();
//     logFormat = winston.format.json();
// } else {
//     logTransports = new winston.transports.File({ filename: '/var/log/webapp/myapp.log' });
//     logFormat = winston.format.combine(
//         winston.format.json(),
//         winston.format.timestamp(),
//     )
// }

// const logger = winston.createLogger({
//     level: 'debug',
//     format: logFormat,
//     transports: [logTransports]
// });

// module.exports = logger;
