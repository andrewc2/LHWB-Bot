import { Snowflake } from 'discord.js';
import { Pool } from 'mysql2/promise';

import { LoggerTool } from '../../tools/Logging';

export class BotBannedRepository {
  private readonly database: Pool;
  private logger: LoggerTool;

  constructor(database: Pool, logger: LoggerTool) {
    this.database = database;
    this.logger = logger;
  }

  async setBotBanned(userId: Snowflake): Promise<void> {
    try {
      await this.database.query('INSERT INTO botBanned (userId) VALUES (?)', [
        userId,
      ]);
    } catch (e) {
      this.logger.error(`Error while setting bot banned user ${userId}`);
      throw e;
    }
  }

  async deleteBotBanned(userId: Snowflake): Promise<void> {
    try {
      await this.database.query('DELETE FROM botBanned WHERE userId = ?', [
        userId,
      ]);
    } catch (e) {
      this.logger.error(`Error while deleting bot banned user ${userId}`);
      throw e;
    }
  }

  async getBotBanned(): Promise<Snowflake[]> {
    try {
      const bannedUsers = await this.database
        .query('SELECT * FROM botBanned')
        .then(([row]) => row as BotBanned[]);

      return bannedUsers.map((user) => user.userId);
    } catch (e) {
      this.logger.error('Error while getting botBanned user');
      throw e;
    }
  }
}

export interface BotBanned {
  userId: Snowflake;
}
