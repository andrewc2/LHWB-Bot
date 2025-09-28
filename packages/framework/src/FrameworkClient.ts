import {
  Awaitable,
  ApplicationCommand,
  Client as DiscordClient,
  ClientOptions,
  Collection,
  Snowflake,
  UserResolvable,
} from 'discord.js';

import { CommandHandler } from './commands/CommandHandler.js';

import type { ClientEvents } from './types/events.js';

export class FrameworkClient<
  Ready extends boolean = boolean,
> extends DiscordClient<Ready> {
  declare public commandHandler: CommandHandler;
  declare public ownerId: Snowflake | Snowflake[];
  declare public apiCommands:
    | Collection<string, ApplicationCommand>
    | undefined;

  public constructor(options: FrameworkClientOptions & ClientOptions);
  public constructor(
    options: FrameworkClientOptions,
    clientOptions: ClientOptions,
  );

  public constructor(
    options: (FrameworkClientOptions & ClientOptions) | FrameworkClientOptions,
    clientOptions?: ClientOptions,
  ) {
    const combinedOptions = { ...options, ...clientOptions };
    super(combinedOptions as FrameworkClientOptions & ClientOptions);
    this.ownerId = combinedOptions.ownerId ?? [];
  }

  public isOwner(user: UserResolvable): boolean {
    const id = this.users.resolveId(user);
    if (!id) return false;
    return Array.isArray(this.ownerId)
      ? this.ownerId.includes(id)
      : id === this.ownerId;
  }
}

type Events = ClientEvents;

export interface FrameworkClient<Ready extends boolean = boolean>
  extends DiscordClient<Ready> {
  on<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => Awaitable<void>,
  ): this;
  on<S extends string | symbol>(
    event: Exclude<S, keyof Events>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  once<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => Awaitable<void>,
  ): this;
  once<S extends string | symbol>(
    event: Exclude<S, keyof Events>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  emit<K extends keyof Events>(event: K, ...args: Events[K]): boolean;
  emit<S extends string | symbol>(
    event: Exclude<S, keyof Events>,
    ...args: unknown[]
  ): boolean;

  off<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => Awaitable<void>,
  ): this;
  off<S extends string | symbol>(
    event: Exclude<S, keyof Events>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  removeAllListeners<K extends keyof Events>(event?: K): this;
  removeAllListeners<S extends string | symbol>(
    event?: Exclude<S, keyof Events>,
  ): this;
}

export interface FrameworkClientOptions {
  ownerId?: Snowflake | Snowflake[];
}
