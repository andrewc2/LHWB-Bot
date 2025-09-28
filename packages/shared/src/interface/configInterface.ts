import { Snowflake } from 'discord.js';

export interface ConfigInterface {
  discord: {
    token: string;
    owner_id: Snowflake;
    client_id: Snowflake;
    mod_role_id: Snowflake;
  };
  lastfm: {
    api_key: string;
    api_secret: string;
  };
  mysql: {
    host: string;
    username: string;
    password: string;
    database: string;
    port: string;
    ca?: string;
  };
  redis: {
    host: string;
    port: string;
    password: string;
  };
}
