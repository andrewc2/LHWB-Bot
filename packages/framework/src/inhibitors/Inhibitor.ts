import { ChatInputCommandInteraction } from 'discord.js';

import { FrameworkModule, ModuleOptions } from '../FrameworkModule.js';
import { FrameworkError } from '../utilities/FrameworkError.js';

import type { Command } from '../commands/Command.js';
import type { FrameworkClient } from '../FrameworkClient.js';
import type { InhibitorHandler } from './InhibitorHandler.js';

export class Inhibitor extends FrameworkModule<InhibitorHandler, Inhibitor> {
  declare public priority: number;
  declare public client: FrameworkClient;
  declare public filepath: string;
  declare public handler: InhibitorHandler;
  declare public id: string;
  declare public reason: string;
  declare public type: string;

  public constructor(id: string, options?: InhibitorOptions) {
    const {
      category,
      reason = '',
      type = 'post',
      priority = 0,
    } = options ?? {};

    super(id, { category });

    this.reason = reason;
    this.type = type;
    this.priority = priority;
  }

  public exec(
    interaction: ChatInputCommandInteraction,
    command?: Command,
  ): boolean | Promise<boolean>;
  public exec(
    interaction: ChatInputCommandInteraction,
    command?: Command,
  ): boolean | Promise<boolean>;
  public exec(
    interaction: ChatInputCommandInteraction,
    command?: Command,
  ): boolean | Promise<boolean> {
    throw new FrameworkError('NOT_IMPLEMENTED', this.constructor.name, 'exec');
  }
}

export interface InhibitorOptions extends ModuleOptions {
  reason?: string;
  type?: 'all' | 'pre' | 'post';
  priority?: number;
}
