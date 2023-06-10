const winston = require('winston');

// Create a logger with a custom format
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'C:\\logs\\error.log', level: 'error' }),
    new winston.transports.File({ filename: 'C:\\logs\\combined.log' })
  ]
});

// Define a middleware function that logs requests
function logRequests(req, res, next) {
  logger.info(`[${req.method}] ${req.url}`);
  next();
}

// Define a middleware function that logs errors
function logErrors(err, req, res, next) {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  next(err);
}

// Export the middleware functions
module.exports = { logRequests, logErrors };