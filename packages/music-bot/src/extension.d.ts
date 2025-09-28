import {
  ConfigInterface,
  LoggerTool,
  MySQLDriver,
  RedisDriver,
} from '@lhwb/shared';

import MusicServer from './modules/music/MusicServer';

import type { FrameworkClient as BaseClient } from '@lhwb/framework';

declare module '@lhwb/framework' {
  interface FrameworkClient extends BaseClient {
    database: MySQLDriver;
    cache: RedisDriver;
    musicServers: MusicServer[];
    logger: LoggerTool;
    config: ConfigInterface;
  }
}
