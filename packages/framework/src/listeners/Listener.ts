import { FrameworkModule, ModuleOptions } from '../FrameworkModule.js';

import type { FrameworkClient } from '../FrameworkClient.js';
import type { ListenerHandler } from './ListenerHandler.js';
import type EventEmitter from 'events';

export class Listener extends FrameworkModule<ListenerHandler, Listener> {
  declare public client: FrameworkClient;
  declare public emitter: string | EventEmitter;
  declare public event: string;
  declare public filepath: string;
  declare public handler: ListenerHandler;
  declare public type: ListenerType;

  public constructor(id: string, options: ListenerOptions) {
    const { category, emitter, event, type = 'on' } = options;

    super(id, { category });
    this.emitter = emitter;
    this.event = event;
    this.type = type;
  }

  public exec(...args: any[]): any {}
}

export interface ListenerOptions extends ModuleOptions {
  emitter: string | EventEmitter;
  event: string;
  type?: ListenerType;
}

export type ListenerType =
  | 'on'
  | 'once'
  | 'prependListener'
  | 'prependOnceListener';
