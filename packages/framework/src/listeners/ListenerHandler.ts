import { Awaitable, Collection } from 'discord.js';

import { Listener } from './Listener.js';
import { Category } from '../Category.js';
import { FrameworkClient } from '../FrameworkClient.js';
import {
  FrameworkHandler,
  FrameworkHandlerOptions,
} from '../FrameworkHandler.js';
import { FrameworkError } from '../utilities/FrameworkError.js';

import type { ListenerHandlerEvents } from '../types/events.js';
import type EventEmitter from 'events';

export class ListenerHandler extends FrameworkHandler<
  Listener,
  ListenerHandler
> {
  declare public categories: Collection<string, Category<string, Listener>>;
  declare public classToHandle: typeof Listener;
  declare public client: FrameworkClient;
  declare public directory: string;
  declare public emitters: Collection<string, EventEmitter>;
  declare public modules: Collection<string, Listener>;

  public constructor(client: FrameworkClient, options: ListenerHandlerOptions) {
    const {
      directory,
      classToHandle = Listener,
      extensions = ['.js', '.ts'],
      automateCategories,
      loadFilter,
    } = options ?? {};

    if (classToHandle !== Listener) {
      throw new FrameworkError(
        'INVALID_CLASS_TO_HANDLE',
        classToHandle.name,
        Listener.name,
      );
    }

    super(client, {
      directory,
      classToHandle,
      extensions,
      automateCategories,
      loadFilter,
    });

    this.emitters = new Collection();
    this.emitters.set('client', this.client);
  }

  public addToEmitter(id: string): Listener {
    const listener: Listener = this.modules.get(id.toString())!;
    if (!listener)
      throw new FrameworkError('MODULE_NOT_FOUND', this.classToHandle.name, id);

    const emitter: EventEmitter = this.isEventEmitter(listener.emitter)
      ? (listener.emitter as EventEmitter)
      : this.emitters.get(listener.emitter as string)!;
    if (!this.isEventEmitter(emitter))
      throw new FrameworkError('INVALID_TYPE', 'emitter', 'EventEmitter', true);

    emitter[listener.type ?? 'on'](listener.event, listener.exec);
    return listener;
  }

  public override register(listener: Listener, filepath?: string): void {
    super.register(listener, filepath);
    listener.exec = listener.exec.bind(listener);
    this.addToEmitter(listener.id);
  }

  public removeFromEmitter(id: string): Listener {
    const listener: Listener = this.modules.get(id.toString())!;
    if (!listener)
      throw new FrameworkError('MODULE_NOT_FOUND', this.classToHandle.name, id);

    const emitter: EventEmitter = this.isEventEmitter(listener.emitter)
      ? (listener.emitter as EventEmitter)
      : this.emitters.get(listener.emitter as string)!;
    if (!this.isEventEmitter(emitter))
      throw new FrameworkError('INVALID_TYPE', 'emitter', 'EventEmitter', true);

    emitter.removeListener(listener.event, listener.exec);
    return listener;
  }

  public setEmitters(emitters: any): ListenerHandler {
    for (const [key, value] of Object.entries(emitters)) {
      if (!this.isEventEmitter(value))
        throw new FrameworkError('INVALID_TYPE', key, 'EventEmitter', true);
      this.emitters.set(key, value);
    }

    return this;
  }

  public isEventEmitter(value: any): value is EventEmitter {
    return (
      value &&
      typeof value.on === 'function' &&
      typeof value.emit === 'function'
    );
  }
}

type Events = ListenerHandlerEvents;

export interface ListenerHandler
  extends FrameworkHandler<Listener, ListenerHandler> {
  on<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => Awaitable<void>,
  ): this;
  once<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => Awaitable<void>,
  ): this;
}

export type ListenerHandlerOptions = FrameworkHandlerOptions<
  Listener,
  ListenerHandler
>;
