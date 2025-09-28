import { Snowflake } from 'discord.js';
import { Pool } from 'mysql2/promise';

import { LoggerTool } from '../../tools/Logging';

export class UserRepository {
  private readonly database: Pool;
  private logger: LoggerTool;

  constructor(database: Pool, logger: LoggerTool) {
    this.database = database;
    this.logger = logger;
  }

  async updateUserSongHistory(
    songHistory: (string | number)[][],
  ): Promise<void> {
    try {
      await this.database.query(
        'INSERT INTO songUserHistory (userId, songId) VALUES ?',
        [songHistory],
      );
    } catch (e) {
      this.logger.error(`Updating recent history in user ${songHistory}`);
      throw e;
    }
  }

  async getUserSongHistory(
    userId: Snowflake,
    limit = 10,
  ): Promise<SongUserHistory[]> {
    try {
      return await this.database
        .query(
          'SELECT * FROM songUserHistory INNER JOIN song on songUserHistory.songId = song.Id WHERE songUserHistory.userId = ? ORDER BY songUserHistory.date DESC LIMIT ?',
          [userId, limit],
        )
        .then(([row]) => row as SongUserHistory[]);
    } catch (e) {
      this.logger.error(`Getting recent history for user: ${userId}`);
      throw e;
    }
  }
}

export interface SongUserHistory {
  'songUserHistory.id': number;
  songId: number;
  userId: Snowflake;
  date: Date;
  'song.id': number;
  officialName: string;
  artistName: string;
  path: string;
  autoPlay: boolean;
  canQueue: boolean;
  playCount: number;
  albumName: string;
  isAlbum: boolean;
  trackNumber: number;
  albumArtworkUrl: string;
}
