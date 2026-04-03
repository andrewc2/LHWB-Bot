import { ChatInputCommandInteraction } from 'discord.js';

import {
  FrameworkHandler,
  FrameworkHandlerOptions,
} from '../FrameworkHandler.js';
import { Inhibitor } from './Inhibitor.js';
import { InhibitorHandlerEvents } from '../types/events.js';
import { FrameworkError } from '../utilities/FrameworkError.js';

import type { Category } from '../Category.js';
import type { Command } from '../commands/Command.js';
import type { FrameworkClient } from '../FrameworkClient.js';
import type { Awaitable, Collection } from 'discord.js';

export class InhibitorHandler
  extends FrameworkHandler<Inhibitor, InhibitorHandler>
  implements InhibitorHandlerEventOverloads
{
  declare public categories: Collection<string, Category<string, Inhibitor>>;
  declare public classToHandle: typeof Inhibitor;
  declare public client: FrameworkClient;
  declare public directory: string;
  declare public modules: Collection<string, Inhibitor>;

  public constructor(
    client: FrameworkClient,
    options: InhibitorHandlerOptions,
  ) {
    const {
      directory,
      classToHandle = Inhibitor,
      extensions = ['.js', '.ts'],
      automateCategories,
      loadFilter,
    } = options ?? {};

    if (classToHandle !== Inhibitor) {
      throw new FrameworkError(
        'INVALID_CLASS_TO_HANDLE',
        classToHandle.name,
        Inhibitor.name,
      );
    }

    super(client, {
      directory,
      classToHandle,
      extensions,
      automateCategories,
      loadFilter,
    });
  }

  public async test(
    type: 'all' | 'pre' | 'post',
    interaction: ChatInputCommandInteraction,
    command?: Command,
  ) {
    if (!this.modules.size) return null;

    const inhibitors = this.modules.filter((i) => i.type === type);
    if (!inhibitors.size) return null;

    const promises = [];

    for (const inhibitor of inhibitors.values()) {
      promises.push(
        (async () => {
          let inhibited = inhibitor.exec(interaction, command);
          if (this.isPromise(inhibited)) inhibited = await inhibited;
          if (inhibited) return inhibitor;
          return null;
        })(),
      );
    }

    const inhibitedInhibitors = (await Promise.all(promises)).filter(
      (r) => r,
    ) as Inhibitor[];
    if (!inhibitedInhibitors.length) return null;

    inhibitedInhibitors.sort((a, b) => b.priority - a.priority);
    return inhibitedInhibitors[0].reason;
  }

  public isPromise(value: unknown): value is Promise<unknown> {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as { then?: unknown; catch?: unknown };
    return (
      typeof candidate.then === 'function' &&
      typeof candidate.catch === 'function'
    );
  }
}

type Events = InhibitorHandlerEvents;

export interface InhibitorHandlerEventOverloads {
  on<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => Awaitable<void>,
  ): this;
  once<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => Awaitable<void>,
  ): this;
}

export type InhibitorHandlerOptions = FrameworkHandlerOptions<
  Inhibitor,
  InhibitorHandler
>;
