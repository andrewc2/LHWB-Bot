import {
  ConfigInterface,
  LoggerTool,
  MySQLDriver,
  RedisDriver,
} from '@lhwb/shared';

import type { FrameworkClient as BaseClient } from '@lhwb/framework';

declare module '@lhwb/framework' {
  interface FrameworkClient extends BaseClient {
    database: MySQLDriver;
    cache: RedisDriver;
    logger: LoggerTool;
    config: ConfigInterface;
  }
}
