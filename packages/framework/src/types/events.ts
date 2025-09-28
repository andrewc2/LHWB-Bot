import { CommandHandler } from '../commands/CommandHandler.js';
import { FrameworkHandler } from '../FrameworkHandler.js';
import { InhibitorHandler } from '../inhibitors/InhibitorHandler.js';
import { ListenerHandler } from '../listeners/ListenerHandler.js';

import type { Command } from '../commands/Command.js';
import type { FrameworkModule } from '../FrameworkModule.js';
import type { Inhibitor } from '../inhibitors/Inhibitor.js';
import type { Listener } from '../listeners/Listener.js';
import type {
  ClientEvents as DiscordClientEvents,
  ChatInputCommandInteraction,
  Message,
} from 'discord.js';

export interface FrameworkHandlerEvents<
  Module extends FrameworkModule<Handler, Module>,
  Handler extends FrameworkHandler<Module, Handler>,
> {
  load: [mod: Module, isReload: boolean];
  remove: [mod: Module];
}

export interface CommandHandlerEvents
  extends FrameworkHandlerEvents<Command, CommandHandler> {
  commandBlocked: [
    interaction: ChatInputCommandInteraction,
    command: Command,
    reason: string,
  ];
  commandFinished: [
    interaction: ChatInputCommandInteraction,
    command: Command,
    args: any,
    returnValue: any,
  ];
  commandLocked: [message: Message, command: Command];
  commandStarted: [message: Message, command: Command, args: any];
  commandNotFound: [interaction: ChatInputCommandInteraction];
  error: [
    error: Error,
    interaction: ChatInputCommandInteraction,
    command?: Command,
  ];
  load: [command: Command, isReload: boolean];
  interactionBlocked: [
    interaction: ChatInputCommandInteraction,
    reason: string,
  ];
  missingPermissions: [
    interaction: ChatInputCommandInteraction,
    command: Command,
    type: 'user' | 'client',
    missing?: any,
  ];
  remove: [command: Command];
}

export interface InhibitorHandlerEvents
  extends FrameworkHandlerEvents<Inhibitor, InhibitorHandler> {}

export interface ListenerHandlerEvents
  extends FrameworkHandlerEvents<Listener, ListenerHandler> {}

export interface ClientEvents extends DiscordClientEvents {
  handlerDebug: [message: string, ...other: any[]];
}
