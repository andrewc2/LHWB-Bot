import { resolve } from 'path';

import { createLogger, format, Logger, transports } from 'winston';

import { Utilities } from './Utilities.js';

const rootDir = Utilities.getProjectRoot();

export class LoggerTool {
  private readonly botName: string;
  private readonly logger: Logger;

  constructor(botName: string) {
    this.botName = botName;

    this.logger = createLogger({
      transports: [
        new transports.Console(),
        new transports.File({ filename: resolve(rootDir, 'log') }),
      ],
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.printf(({ level, message, timestamp, bot, stack }) => {
          const botLabel = bot ? `[${bot}]` : '';
          const errorStack = stack ? `\n${stack}` : '';
          return `[${timestamp}] ${level.toUpperCase()} ${botLabel}: ${message}${errorStack}`;
        }),
      ),
    });
  }

  public warn(message: string): void {
    this.logger.warn(message, { bot: this.botName });
  }

  public error(message: string) {
    this.logger.error(message, { bot: this.botName });
  }

  public info(message: string) {
    this.logger.info(message, { bot: this.botName });
  }

  public debug(message: string) {
    this.logger.debug(message, { bot: this.botName });
  }
}
