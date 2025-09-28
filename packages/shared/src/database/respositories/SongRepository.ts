import { Pool, RowDataPacket } from 'mysql2/promise';

import { LoggerTool } from '../../tools/Logging';

export class SongRepository {
  private readonly database: Pool;
  private logger: LoggerTool;

  constructor(database: Pool, logger: LoggerTool) {
    this.database = database;
    this.logger = logger;
  }

  async getSong(songName: string): Promise<Song | null> {
    try {
      const [row] = await this.database.query<RowDataPacket[]>(
        'SELECT * FROM song WHERE officialName = ? LIMIT 1',
        [songName],
      );
      return row.length > 0 ? (row[0] as Song) : null;
    } catch (e) {
      this.logger.error(`Finding song ${songName}`);
      throw e;
    }
  }

  async getRandomSongByArtist(artistName: string): Promise<Song> {
    try {
      const [row] = await this.database.query<RowDataPacket[]>(
        'SELECT * FROM song WHERE autoPlay = 1 AND canQueue = 1 AND artistName = ? ORDER BY RAND() LIMIT 1',
        [artistName],
      );
      return row[0] as Song;
    } catch (e) {
      this.logger.error('Finding random song');
      throw e;
    }
  }

  async updatePlayCount(songId: number): Promise<void> {
    try {
      await this.database.query(
        'UPDATE song SET playCount = playCount + 1 WHERE id = ?',
        [songId],
      );
    } catch (e) {
      this.logger.error(`Updating play count`);
      throw e;
    }
  }

  async getAlbum(albumName: string): Promise<Song[]> {
    try {
      return await this.database
        .query(
          'SELECT * FROM song WHERE albumName = ? AND isAlbum = 1 ORDER BY trackNumber',
          [albumName],
        )
        .then(([row]) => row as Song[]);
    } catch (e) {
      this.logger.error(`Getting album ${albumName}`);
      throw e;
    }
  }

  async rankSongPlays(limit: number = 10): Promise<Song[]> {
    try {
      return await this.database
        .query(
          'SELECT * FROM song WHERE playCount > 0 ORDER BY playCount DESC LIMIT ?',
          [limit],
        )
        .then(([row]) => row as Song[]);
    } catch (e) {
      this.logger.error(`Ranking song plays by limit ${limit}`);
      throw e;
    }
  }

  async getAvailableAlbums(): Promise<Album[]> {
    try {
      return this.database
        .query(
          'SELECT albumName, artistName FROM song WHERE isAlbum = 1 GROUP BY albumName, artistName',
        )
        .then(([row]) => row as Album[]);
    } catch (e) {
      this.logger.error('Getting available albums');
      throw e;
    }
  }

  async songAutoComplete(songName: string): Promise<Song[]> {
    try {
      return await this.database
        .query(
          'SELECT * FROM songName INNER JOIN song ON songName.songId = song.id WHERE songName.name LIKE ? LIMIT 5',
          [songName],
        )
        .then(([row]) => row as Song[]);
    } catch (e) {
      this.logger.error(`Song autocomplete for value ${songName}`);
      throw e;
    }
  }

  async albumAutoComplete(albumName: string): Promise<Album[]> {
    try {
      return await this.database
        .query(
          'SELECT DISTINCT `albumName`, `artistName` FROM song WHERE `isAlbum` = ? AND `albumName` LIKE ? LIMIT 10',
          [1, albumName],
        )
        .then(([row]) => row as Album[]);
    } catch (e) {
      this.logger.error(`Album autocomplete for value ${albumName}`);
      throw e;
    }
  }
}

export interface Song {
  id: number;
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

export interface Album {
  albumName: string;
  artistName: string;
}
