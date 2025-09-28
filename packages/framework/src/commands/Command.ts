import {
  APIApplicationCommandOption,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  PermissionResolvable,
} from 'discord.js';

import { FrameworkClient } from '../FrameworkClient.js';
import { FrameworkModule, ModuleOptions } from '../FrameworkModule.js';
import { CommandHandler } from './CommandHandler.js';

export class Command extends FrameworkModule<CommandHandler, Command> {
  declare public guildOnly?: boolean;
  declare public client: FrameworkClient;
  declare public clientPermissions?:
    | PermissionResolvable
    | PermissionResolvable[];
  declare public userPermissions?:
    | PermissionResolvable
    | PermissionResolvable[]
    | MissingPermissionSupplier;
  declare public description: string;
  declare public deferReply?: boolean;
  declare public usage?: string;
  declare public example?: string;
  declare public ephemeral?: boolean;
  declare public filepath: string;
  declare public handler: CommandHandler;
  declare public id: string;
  declare public name: string;
  declare public ownerOnly?: boolean;
  declare public options?: APIApplicationCommandOption[];

  constructor(id: string, commandOptions?: CommandOptions) {
    super(id, { category: commandOptions?.category });

    const {
      guildOnly = false,
      clientPermissions = this.clientPermissions,
      description,
      deferReply = true,
      usage = null,
      example = null,
      ephemeral = false,
      name,
      ownerOnly = false,
      options = [],
      userPermissions = this.userPermissions,
    } = commandOptions ?? {};

    this.guildOnly = Boolean(guildOnly)!;
    this.clientPermissions = clientPermissions;
    this.description = description!;
    this.deferReply = Boolean(deferReply);
    this.usage = usage!;
    this.example = example!;
    this.ephemeral = Boolean(ephemeral);
    this.name = name!;
    this.ownerOnly = Boolean(ownerOnly);
    this.options = options;
    this.userPermissions =
      typeof userPermissions === 'function'
        ? userPermissions.bind(this)
        : userPermissions;
  }

  public before(interaction: ContextMenuCommandInteraction): any {}
  public exec(interaction: ChatInputCommandInteraction): any {}
  public autocomplete(interaction: AutocompleteInteraction): any {}
}

export type MissingPermissionSupplier = (
  interaction: ChatInputCommandInteraction,
) => Promise<any> | any;

export interface CommandOptions extends ModuleOptions {
  guildOnly?: boolean;
  clientPermissions?: PermissionResolvable | PermissionResolvable[];
  description: string;
  deferReply?: boolean;
  usage?: string;
  example?: string;
  ephemeral?: boolean;
  name: string;
  ownerOnly?: boolean;
  options?: APIApplicationCommandOption[];
  userPermissions?:
    | PermissionResolvable
    | PermissionResolvable[]
    | MissingPermissionSupplier;
}
