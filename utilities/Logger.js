import { createLogger, format, transports } from 'winston';
const { combine, timestamp, prettyPrint, errors } = format;

const log = createLogger({
  format: combine(
    errors({ stack: true }),
    timestamp(),
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'log' }),
  ],
});

export default class Logger {
  static warn(message) {
    log.log('warn', message);
  }

  static error(message) {
    log.log('error', message);
  }

  static info(message) {
    log.log('info', message);
  }
}

