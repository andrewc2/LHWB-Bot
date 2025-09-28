import { Snowflake } from 'discord.js';
import { Pool, RowDataPacket } from 'mysql2/promise';

import { LoggerTool } from '../../tools/Logging';

export class GuildRepository {
  private readonly database: Pool;
  private logger: LoggerTool;

  constructor(database: Pool, logger: LoggerTool) {
    this.database = database;
    this.logger = logger;
  }

  async updateGuildSongHistory(
    songId: number,
    guildId: Snowflake,
    queuedBy: string | undefined,
  ): Promise<void> {
    try {
      await this.database.query(
        'INSERT INTO songGuildHistory (songId, guildId, queuedBy) VALUES (?,?,?)',
        [songId, guildId, queuedBy],
      );
    } catch (e) {
      this.logger.error(
        `Updating recent history in guild ${guildId} with song id ${songId}${queuedBy ? `, queued by ${queuedBy}` : ''}`,
      );
      throw e;
    }
  }

  async getGuildSongHistory(
    guildId: Snowflake,
    limit = 10,
  ): Promise<SongGuildHistory[]> {
    try {
      return await this.database
        .query(
          'SELECT * FROM songGuildHistory INNER JOIN song ON songGuildHistory.songId = song.Id WHERE songGuildHistory.guildId = ? ORDER BY songGuildHistory.id DESC LIMIT ?',
          [guildId, limit],
        )
        .then(([row]) => row as SongGuildHistory[]);
    } catch (e) {
      this.logger.error(`Getting recent history in guild: ${guildId}`);
      throw e;
    }
  }

  async getGuildTrustedRole(
    guildId: Snowflake,
  ): Promise<Snowflake | undefined> {
    try {
      const [row] = await this.database.query<RowDataPacket[]>(
        'SELECT * FROM trustedRole WHERE guildId = ?',
        [guildId],
      );
      return row.length === 0 ? undefined : (row[0]['roleId'] as Snowflake);
    } catch (e) {
      this.logger.error(`Getting guild trusted role from guild: ${guildId}`);
      throw e;
    }
  }

  async setGuildTrustedRole(
    guildId: Snowflake,
    roleId: Snowflake,
  ): Promise<void> {
    try {
      await this.database.query(
        'INSERT INTO trustedRole (guildId, roleId) VALUES (?,?)',
        [guildId, roleId],
      );
    } catch (e) {
      this.logger.error(`Setting trusted role ${roleId} for guild ${guildId}`);
      throw e;
    }
  }

  async updateGuildTrustedRole(
    guildId: Snowflake,
    roleId: Snowflake,
  ): Promise<void> {
    try {
      await this.database.query(
        'UPDATE trustedRole SET roleId = ? WHERE guildId = ? ',
        [roleId, guildId],
      );
    } catch (e) {
      this.logger.error(`Updating trusted role ${roleId} for guild ${guildId}`);
      throw e;
    }
  }

  async clearGuildTrustedRole(guildId: Snowflake): Promise<void> {
    try {
      await this.database.query('DELETE FROM trustedRole WHERE guildId = ?', [
        guildId,
      ]);
    } catch (e) {
      this.logger.error(`Clearing trusted role for guild ${guildId}`);
      throw e;
    }
  }

  async clearGuildTrustedRoleByRoleId(roleId: Snowflake): Promise<void> {
    try {
      await this.database.query('DELETE FROM trustedRole WHERE roleId = ?', [
        roleId,
      ]);
    } catch (e) {
      this.logger.error(`Clearing trusted role for guild by role id ${roleId}`);
      throw e;
    }
  }
}

export interface SongGuildHistory {
  'songGuildHistory.id': number;
  songId: number;
  guildId: Snowflake;
  queuedBy: string | null;
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
