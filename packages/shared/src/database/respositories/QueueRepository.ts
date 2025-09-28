import { Snowflake } from 'discord.js';
import { Pool } from 'mysql2/promise';

import { LoggerTool } from '../../tools/Logging';

export class QueueRepository {
  private readonly database: Pool;
  private logger: LoggerTool;

  constructor(database: Pool, logger: LoggerTool) {
    this.database = database;
    this.logger = logger;
  }

  async addToGuildQueue(
    songId: number,
    guildId: Snowflake,
    queuedBy: string,
  ): Promise<void> {
    try {
      await this.database.query(
        'INSERT INTO songQueue (songId, guildId, queuedBy) VALUES (?,?,?)',
        [songId, guildId, queuedBy],
      );
    } catch (e) {
      this.logger.error(
        `Adding Song Id ${songId} to queue in guild ${guildId}`,
      );
      throw e;
    }
  }

  async addAlbumToGuildQueue(
    album: (number | string | null)[][],
  ): Promise<void> {
    try {
      await this.database.query(
        'INSERT INTO songQueue (songId, guildId, queuedBy) VALUES ?',
        [album],
      );
    } catch (e) {
      this.logger.error(`Adding songs ${album} to the queue`);
      throw e;
    }
  }

  async deleteFromGuildQueue(
    songId: number,
    guildId: Snowflake,
  ): Promise<void> {
    try {
      await this.database.query(
        'DELETE FROM songQueue WHERE songId = ? AND guildId = ? LIMIT 1',
        [songId, guildId],
      );
    } catch (e) {
      this.logger.error(`Deleted Song Id ${songId} in guild ${guildId}`);
      throw e;
    }
  }

  async clearGuildQueue(guildId: Snowflake): Promise<void> {
    try {
      await this.database.query('DELETE FROM songQueue WHERE guildId = ?', [
        guildId,
      ]);
    } catch (e) {
      this.logger.error(`Clearing queue in guild ${guildId}`);
      throw e;
    }
  }

  async searchGuildQueue(guildId: Snowflake): Promise<SongQueue[]> {
    try {
      return await this.database
        .query(
          'SELECT * FROM songQueue INNER JOIN song ON songQueue.songId = song.id WHERE songQueue.guildId = ? ORDER BY songQueue.id',
          [guildId],
        )
        .then(([row]) => row as SongQueue[]);
    } catch (e) {
      this.logger.error(`Getting queue for guild ${guildId}`);
      throw e;
    }
  }

  async getSongFromQueue(
    songId: number,
    guildId: Snowflake,
  ): Promise<SongQueue[]> {
    try {
      return await this.database
        .query(
          'SELECT * FROM songQueue INNER JOIN song ON songQueue.songId = song.id WHERE songQueue.guildId = ? AND song.id = ?',
          [guildId, songId],
        )
        .then(([row]) => row as SongQueue[]);
    } catch (e) {
      this.logger.error(
        `Getting Song Id ${songId} in queue in guild ${guildId}`,
      );
      throw e;
    }
  }
}

export interface SongQueue {
  'songQueue.id': number;
  songId: number;
  guildId: Snowflake;
  queuedBy: string;
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
