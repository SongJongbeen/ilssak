// logger.js
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      const msg = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;
      return `${timestamp} ${level}: ${msg}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'src/celestial-league/records/output.log' })
  ]
});

module.exports = logger;
