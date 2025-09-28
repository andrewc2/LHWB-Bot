import { readFile } from 'fs/promises';
import { basename, dirname, join } from 'path';

import { createPool, Pool, RowDataPacket } from 'mysql2/promise';
import { Umzug } from 'umzug';

import { BotBannedRepository } from './respositories/BotBannedRepository.js';
import { GuildRepository } from './respositories/GuildRepository.js';
import { QueueRepository } from './respositories/QueueRepository.js';
import { SongRepository } from './respositories/SongRepository.js';
import { UserRepository } from './respositories/UserRepository.js';
import { ConfigInterface } from '../interface/configInterface.js';
import { LoggerTool } from '../tools/Logging.js';
import { Utilities } from '../tools/Utilities.js';

const config = (await Utilities.loadJSON('config.json')) as ConfigInterface;

const username = config.mysql.username;
const password = config.mysql.password;
const host = config.mysql.host;
const database = config.mysql.database;
const port = config.mysql.port;
const ca = config.mysql.ca;

const rootPath = Utilities.getProjectRoot();
const migrationsGlob = join(rootPath, 'migrations/*.sql');

export class MySQLDriver {
  private readonly database: Pool;
  private readonly logger: LoggerTool;
  private readonly umzug: Umzug<Pool>;

  public song: SongRepository;
  public queue: QueueRepository;
  public guild: GuildRepository;
  public user: UserRepository;
  public botBanned: BotBannedRepository;

  constructor(logger: LoggerTool) {
    this.logger = logger;
    this.database = createPool({
      user: username,
      password: password,
      host: host,
      database: database,
      port: Number(port),
      waitForConnections: true,
      enableKeepAlive: true,
      connectionLimit: 76,
      multipleStatements: true,
      idleTimeout: 28800,
      ...(ca && {
        ssl: {
          ca: ca,
        },
      }),
    });

    this.song = new SongRepository(this.database, this.logger);
    this.queue = new QueueRepository(this.database, this.logger);
    this.guild = new GuildRepository(this.database, this.logger);
    this.user = new UserRepository(this.database, this.logger);
    this.botBanned = new BotBannedRepository(this.database, this.logger);

    this.umzug = new Umzug({
      migrations: {
        glob: migrationsGlob,
        resolve(params) {
          const downPath = join(
            dirname(params.path!),
            'down',
            basename(params.path!),
          );
          return {
            name: params.name,
            path: params.path,
            up: async () => {
              const sql = await readFile(params.path!, 'utf-8');
              await params.context.query(sql);
            },
            down: async () => {
              const sql = await readFile(downPath, 'utf-8');
              await params.context.query(sql);
            },
          };
        },
      },
      create: {
        folder: 'migrations',
      },
      context: this.database,
      storage: {
        async executed({ context: client }) {
          await client.query(`
            create table if not exists migration (
              name varchar(255) primary key,
              runOn timestamp default current_timestamp
            )
          `);
          const [results] = await client.query<RowDataPacket[]>(
            `select name from migration`,
          );
          return results.map((r) => r.name as string);
        },
        async logMigration({ name, context: client }) {
          await client.query(`insert into migration(name) values (?)`, [name]);
        },
        async unlogMigration({ name, context: client }) {
          await client.query(`delete from migration where name = ?`, [name]);
        },
      },
      logger: {
        info: (msg: string | Record<string, unknown>) => {
          this.logger.info(typeof msg === 'string' ? msg : JSON.stringify(msg));
        },
        warn: (msg: string | Record<string, unknown>) => {
          this.logger.warn(typeof msg === 'string' ? msg : JSON.stringify(msg));
        },
        error: (msg: string | Record<string, unknown>) => {
          this.logger.error(
            typeof msg === 'string' ? msg : JSON.stringify(msg),
          );
        },
        debug: (msg: string | Record<string, unknown>) => {
          this.logger.debug(
            typeof msg === 'string' ? msg : JSON.stringify(msg),
          );
        },
      },
    });
  }

  public async connect() {
    this.logger.info('Database connection established');
    await this.umzug.up();
  }

  public async query<
    T extends RowDataPacket[],
    P extends readonly unknown[] = [],
  >(sql: string, params?: P): Promise<T> {
    try {
      const [rows] = await this.database.query<T>(sql, params ?? []);
      return rows;
    } catch (e) {
      this.logger.error(`Database query failed: ${sql}`);
      throw e;
    }
  }
}
