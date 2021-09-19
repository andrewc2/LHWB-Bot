const winston = require("winston");

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "log" }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${new Date().toLocaleString()}: ${log.message}`),
});

module.exports = { logger };
