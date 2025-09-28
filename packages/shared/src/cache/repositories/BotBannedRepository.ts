import { Snowflake } from 'discord.js';
import { RedisClientType } from 'redis';

import { MySQLDriver } from '../../database/MySQLDriver.js';
import { LoggerTool } from '../../tools/Logging.js';

export class BotBannedRepository {
  private readonly client: RedisClientType;
  private readonly database: MySQLDriver;
  private readonly logger: LoggerTool;
  private readonly key = 'banned-users';

  constructor(
    client: RedisClientType,
    database: MySQLDriver,
    logger: LoggerTool,
  ) {
    this.client = client;
    this.database = database;
    this.logger = logger;
  }

  public async isBanned(userId: Snowflake): Promise<boolean> {
    try {
      const bans = await this.getAllBans();
      return bans.includes(userId);
    } catch (e) {
      this.logger.error(`Failed to check banned user in Redis: ${e}`);
      return false;
    }
  }

  public async setAllBans(bans: Snowflake[]): Promise<void> {
    try {
      await this.client.set(this.key, JSON.stringify(bans), {
        EX: 24 * 60 * 60,
      });
    } catch (e) {
      this.logger.error(`Failed to set banned users in Redis: ${e}`);
      throw e;
    }
  }

  private async getAllBans(): Promise<Snowflake[]> {
    try {
      const raw = await this.client.get(this.key);

      if (raw) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      }

      const freshBans = await this.database.botBanned.getBotBanned();
      await this.setAllBans(freshBans);

      return freshBans;
    } catch (e) {
      this.logger.error(`Failed to get banned users from Redis: ${e}`);
      return [];
    }
  }
}
