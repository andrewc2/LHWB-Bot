const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint, errors } = format;

const logger = createLogger({
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

module.exports = { logger };
