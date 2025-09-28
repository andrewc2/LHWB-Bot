import {
  AutocompleteInteraction,
  ChannelType,
  ChatInputCommandInteraction,
  Collection,
  Events as DiscordEvents,
  InteractionType,
  MessageFlags,
  Snowflake,
} from 'discord.js';

import { Category } from '../Category.js';
import {
  FrameworkHandler,
  FrameworkHandlerOptions,
} from '../FrameworkHandler.js';
import { Command } from './Command.js';
import { FrameworkClient } from '../FrameworkClient.js';
import { InhibitorHandler } from '../inhibitors/InhibitorHandler.js';
import { ListenerHandler } from '../listeners/ListenerHandler.js';
import {
  BuiltInReasons,
  CommandHandlerEvents,
} from '../utilities/constants.js';
import { FrameworkError } from '../utilities/FrameworkError.js';

export class CommandHandler extends FrameworkHandler<Command, CommandHandler> {
  declare public blockBots: boolean;
  declare public blockClient: boolean;
  declare public categories: Collection<string, Category<string, Command>>;
  declare public classToHandle: typeof Command;
  declare public client: FrameworkClient;
  declare public directory: string;
  declare public ignorePermissions: Snowflake | Snowflake[];
  declare public inhibitorHandler: InhibitorHandler | null;
  declare public listenerHandler: ListenerHandler | null;
  declare public modules: Collection<string, Command>;
  declare public names: Collection<string, string>;
  declare public skipBuiltInPostInhibitors: boolean;

  public constructor(client: FrameworkClient, options: CommandHandlerOptions) {
    const {
      directory,
      classToHandle = Command,
      extensions = ['.js', '.ts'],
      automateCategories,
      loadFilter,
      blockClient = true,
      blockBots = true,
      ignorePermissions = [],
      skipBuiltInPostInhibitors = false,
    } = options ?? {};

    if (classToHandle !== Command) {
      throw new FrameworkError(
        'INVALID_CLASS_TO_HANDLE',
        classToHandle.name,
        Command.name,
      );
    }

    super(client, {
      directory,
      classToHandle,
      extensions,
      automateCategories,
      loadFilter,
    });

    this.names = new Collection();
    this.blockClient = Boolean(blockClient);
    this.blockBots = Boolean(blockBots);
    this.ignorePermissions = ignorePermissions;
    this.inhibitorHandler = null;
    this.listenerHandler = null;
    this.skipBuiltInPostInhibitors = Boolean(skipBuiltInPostInhibitors);
    this.setup();
  }

  protected setup() {
    this.client.once(DiscordEvents.ClientReady, () => {
      this.client.on(DiscordEvents.InteractionCreate, (i) => {
        if (i.isChatInputCommand()) void this.handleChatInputCommand(i);
        if (i.type === InteractionType.ApplicationCommandAutocomplete)
          this.handleAutocomplete(i);
      });
    });
  }

  public override register(command: Command, filepath?: string): void {
    super.register(command, filepath);

    const conflict = this.names.get(command.name.toLowerCase());
    if (conflict)
      throw new FrameworkError(
        'NAME_CONFLICT',
        command.name,
        command.id,
        conflict,
      );

    const name = command.name.toLowerCase();
    this.names.set(name, command.id);
  }

  public async handleChatInputCommand(
    interaction: ChatInputCommandInteraction,
  ) {
    const commandName = this.getCommandName(interaction);
    const commandModule = this.findCommand(commandName);

    if (!commandModule) {
      this.emit(CommandHandlerEvents.COMMAND_NOT_FOUND, interaction);
      return false;
    }

    if (commandModule.deferReply) {
      await interaction.deferReply({
        withResponse: true,
        ...(commandModule.ephemeral ? { flags: [MessageFlags.Ephemeral] } : {}),
      });
    }

    try {
      if (await this.runAllTypeInhibitors(interaction)) {
        return false;
      }

      if (await this.runPreTypeInhibitors(interaction)) {
        return false;
      }

      if (await this.runPostTypeInhibitors(interaction, commandModule)) {
        return false;
      }

      try {
        this.emit(
          CommandHandlerEvents.COMMAND_STARTED,
          interaction,
          commandModule,
        );
        const ret = await commandModule.exec(interaction);
        this.emit(
          CommandHandlerEvents.COMMAND_FINISHED,
          interaction,
          commandModule,
          ret,
        );
        return true;
      } catch (e) {
        this.emit(CommandHandlerEvents.ERROR, e, interaction, commandModule);
        return false;
      }
    } catch (e: any) {
      this.emitError(e, interaction, commandModule);
      return null;
    }
  }

  public handleAutocomplete(interaction: AutocompleteInteraction): void {
    const commandName = this.getCommandName(interaction);
    const commandModule = this.findCommand(commandName);

    if (!commandModule) {
      this.emit(CommandHandlerEvents.COMMAND_NOT_FOUND, interaction);
      return;
    }

    this.client.emit(
      'structureDebug',
      `Autocomplete started for ${interaction.commandName}`,
    );
    commandModule.autocomplete(interaction);
  }

  public async runAllTypeInhibitors(
    interaction: ChatInputCommandInteraction,
  ): Promise<boolean> {
    const reason = this.inhibitorHandler
      ? await this.inhibitorHandler.test('all', interaction)
      : null;

    if (reason != null) {
      this.emit(CommandHandlerEvents.INTERACTION_BLOCKED, interaction, reason);
    } else if (!interaction.user) {
      this.emit(
        CommandHandlerEvents.INTERACTION_BLOCKED,
        interaction,
        BuiltInReasons.AUTHOR_NOT_FOUND,
      );
    } else if (
      this.blockClient &&
      interaction.user.id === this.client.user?.id
    ) {
      this.emit(
        CommandHandlerEvents.INTERACTION_BLOCKED,
        interaction,
        BuiltInReasons.CLIENT,
      );
    } else if (this.blockBots && interaction.user.bot) {
      this.emit(
        CommandHandlerEvents.INTERACTION_BLOCKED,
        interaction,
        BuiltInReasons.BOT,
      );
    } else {
      return false;
    }

    return true;
  }

  public async runPreTypeInhibitors(
    interaction: ChatInputCommandInteraction,
  ): Promise<boolean> {
    const reason = this.inhibitorHandler
      ? await this.inhibitorHandler.test('pre', interaction)
      : null;

    if (reason != null) {
      this.emit(CommandHandlerEvents.INTERACTION_BLOCKED, interaction, reason);
    } else {
      return false;
    }

    return true;
  }

  public async runPostTypeInhibitors(
    interaction: ChatInputCommandInteraction,
    command: Command,
  ): Promise<boolean> {
    const event = CommandHandlerEvents.COMMAND_BLOCKED;

    if (!this.skipBuiltInPostInhibitors) {
      if (command.ownerOnly) {
        const isOwner = this.client.isOwner(interaction.user);
        if (!isOwner) {
          this.emit(event, interaction, command, BuiltInReasons.OWNER);
          return true;
        }
      }

      if (command.guildOnly && !interaction.guild) {
        this.emit(event, interaction, command, BuiltInReasons.GUILD);
        return true;
      }
    }

    if (!this.skipBuiltInPostInhibitors) {
      if (await this.runPermissionChecks(interaction, command)) {
        return true;
      }
    }

    const reason = this.inhibitorHandler
      ? await this.inhibitorHandler.test('post', interaction, command)
      : null;

    if (this.skipBuiltInPostInhibitors && reason == null) {
      if (await this.runPermissionChecks(interaction, command)) {
        return true;
      }
    }

    if (reason != null) {
      this.emit(event, interaction, command, reason);
      return true;
    }

    return false;
  }

  public async runPermissionChecks(
    interaction: ChatInputCommandInteraction,
    command: Command,
  ): Promise<boolean> {
    const event = CommandHandlerEvents.MISSING_PERMISSIONS;

    if (command.clientPermissions) {
      if (interaction.guild) {
        if (
          interaction.channel?.type === ChannelType.DM ||
          (interaction.channel && interaction.channel.isDMBased())
        )
          return false;
        const missing = interaction.channel
          ?.permissionsFor(interaction.guild.members.me!)
          ?.missing(command.clientPermissions);
        if (missing?.length) {
          this.emit(event, interaction, command, 'client', missing);
          return true;
        }
      }
    }

    if (command.userPermissions) {
      const ignore = this.ignorePermissions;
      const isIgnored = Array.isArray(ignore)
        ? ignore.includes(interaction.user.id)
        : interaction.user.id === ignore;

      if (!isIgnored) {
        if (typeof command.userPermissions === 'function') {
          let missing = command.userPermissions(interaction);
          if (this.isPromise(missing)) missing = await missing;

          if (missing != null) {
            this.emit(event, interaction, command, 'user', missing);
            return true;
          }
        } else if (interaction.guild) {
          if (
            interaction.channel?.type === ChannelType.DM ||
            (interaction.channel && interaction.channel.isDMBased())
          )
            return false;
          const missing = interaction.channel
            ?.permissionsFor(interaction.user)
            ?.missing(command.userPermissions);
          if (missing?.length) {
            this.emit(event, interaction, command, 'user', missing);
            return true;
          }
        }
      }
    }

    return false;
  }

  public useInhibitorHandler(
    inhibitorHandler: InhibitorHandler,
  ): CommandHandler {
    this.inhibitorHandler = inhibitorHandler;
    return this;
  }

  public useListenerHandler(listenerHandler: ListenerHandler): CommandHandler {
    this.listenerHandler = listenerHandler;
    return this;
  }

  public emitError(
    err: Error,
    interaction: ChatInputCommandInteraction,
    command?: Command,
  ): void {
    if (this.listenerCount(CommandHandlerEvents.ERROR)) {
      this.emit(CommandHandlerEvents.ERROR, err, interaction, command);
      return;
    }
    throw err;
  }

  public findCommand(name: string): Command {
    return this.modules.get(this.names.get(name.toLowerCase())!)!;
  }

  public isPromise(value: Promise<any>) {
    return (
      value &&
      typeof value.then === 'function' &&
      typeof value.catch === 'function'
    );
  }

  public getCommandName(
    interaction: ChatInputCommandInteraction | AutocompleteInteraction,
  ) {
    let commandName = interaction.commandName;
    if (interaction.options.getSubcommandGroup(false) !== null)
      commandName += ` ${interaction.options.getSubcommandGroup()}`;
    if (interaction.options.getSubcommand(false) !== null)
      commandName += ` ${interaction.options.getSubcommand()}`;
    return commandName;
  }
}

interface CommandHandlerOptions
  extends FrameworkHandlerOptions<Command, CommandHandler> {
  blockBots?: boolean;
  blockClient?: boolean;
  ignorePermissions?: Snowflake | Snowflake[];
  skipBuiltInPostInhibitors?: boolean;
}
