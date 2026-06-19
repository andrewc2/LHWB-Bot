import type { Command } from '../commands/Command.js';
import type { Inhibitor } from '../inhibitors/Inhibitor.js';
import type { Listener } from '../listeners/Listener.js';
import type {
  ClientEvents as DiscordClientEvents,
  ChatInputCommandInteraction,
  Message,
} from 'discord.js';

export interface FrameworkHandlerEvents<Module> {
  load: [mod: Module, isReload: boolean];
  remove: [mod: Module];
}

export interface CommandHandlerEvents extends FrameworkHandlerEvents<Command> {
  commandBlocked: [
    interaction: ChatInputCommandInteraction,
    command: Command,
    reason: string,
  ];
  commandFinished: [
    interaction: ChatInputCommandInteraction,
    command: Command,
    args: unknown,
    returnValue: unknown,
  ];
  commandLocked: [message: Message, command: Command];
  commandStarted: [message: Message, command: Command, args: unknown];
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
    missing?: unknown,
  ];
  remove: [command: Command];
}

export type InhibitorHandlerEvents = FrameworkHandlerEvents<Inhibitor>;

export type ListenerHandlerEvents = FrameworkHandlerEvents<Listener>;

export interface ClientEvents extends DiscordClientEvents {
  handlerDebug: [message: string, ...other: unknown[]];
}
