import { createClient, RedisClientType } from 'redis';

import { ConfigInterface } from '../interface/configInterface.js';
import { LoggerTool } from '../tools/Logging.js';
import { Utilities } from '../tools/Utilities.js';
import { BotBannedRepository } from './repositories/BotBannedRepository.js';
import { MySQLDriver } from '../database/MySQLDriver.js';

const config = (await Utilities.loadJSON('config.json')) as ConfigInterface;

const host = config.redis.host;
const port = config.redis.port;
const password = config.redis.password;

export class RedisDriver {
  private readonly redisClient: RedisClientType;
  private readonly database: MySQLDriver;
  private readonly logger: LoggerTool;

  public botBanned: BotBannedRepository;

  constructor(logger: LoggerTool, database: MySQLDriver) {
    this.logger = logger;
    this.redisClient = createClient({
      socket: { host, port: Number(port) },
      password: password,
      pingInterval: 3000,
    });
    this.database = database;

    this.botBanned = new BotBannedRepository(
      this.redisClient,
      this.database,
      this.logger,
    );
  }

  async connect() {
    await this.redisClient
      .connect()
      .then(() => this.logger.info('Cache connection established'))
      .catch((e) => this.logger.error(e));
  }
}
