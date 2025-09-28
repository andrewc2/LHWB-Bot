import { Snowflake } from 'discord.js';

export interface StoreConfigInterface {
  store_name: string;
  store_name_short: string;
  store_url: string;
  discord_information: DiscordInformation[];
  currency_symbol: string;
  enable_cart: boolean;
  enable_buy_now: boolean;
  interval: number;
  mass_ping_limit?: number;
  webhook_url?: string;
}

export interface DiscordInformation {
  channel_id: Snowflake;
  role_id: Snowflake;
}
