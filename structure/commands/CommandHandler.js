import {
  ChannelType,
  Collection,
  Events as DiscordEvents,
  InteractionType,
} from 'discord.js';
import Handler from '../Handler.js';
import Command from './Command.js';
import {
  BuiltInReasons,
  CommandHandlerEvents,
} from '../utilities/constants.js';
import StructureError from '../utilities/StructureError.js';

export default class CommandHandler extends Handler {
  constructor(client, options) {
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
      throw new StructureError(
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

  setup() {
    this.client.once(DiscordEvents.ClientReady, () => {
      this.client.on(DiscordEvents.InteractionCreate, (i) => {
        if (i.isChatInputCommand()) void this.handleChatInputCommand(i);
        if (i.type === InteractionType.ApplicationCommandAutocomplete) {this.handleAutocomplete(i);}
      });
    });
  }

  register(command, filepath) {
    super.register(command, filepath);

    const conflict = this.names.get(command.name.toLowerCase());
    if (conflict) {
      throw new StructureError(
        'NAME_CONFLICT',
        command.name,
        command.id,
        conflict,
      );
    }

    const name = command.name.toLowerCase();
    this.names.set(name, command.id);
  }

  async handleChatInputCommand(
    interaction,
  ) {
    const commandName = this.getCommandName(interaction);
    const commandModule = this.findCommand(commandName);

    if (!commandModule) {
      this.emit(CommandHandlerEvents.COMMAND_NOT_FOUND, interaction);
      return false;
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
      }
      catch (e) {
        this.emit(
          CommandHandlerEvents.ERROR,
          e,
          interaction,
          commandModule,
        );
        return false;
      }
    }
    catch (e) {
      this.emitError(e, interaction, commandModule);
      return null;
    }
  }

  handleAutocomplete(interaction) {
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

  async runAllTypeInhibitors(
    interaction,
  ) {
    const reason = this.inhibitorHandler
      ? await this.inhibitorHandler.test('all', interaction)
      : null;

    if (reason != null) {
      this.emit(
        CommandHandlerEvents.INTERACTION_BLOCKED,
        interaction,
        reason,
      );
    }
    else if (!interaction.user) {
      this.emit(
        CommandHandlerEvents.INTERACTION_BLOCKED,
        interaction,
        BuiltInReasons.AUTHOR_NOT_FOUND,
      );
    }
    else if (
      this.blockClient &&
            interaction.user.id === this.client.user?.id
    ) {
      this.emit(
        CommandHandlerEvents.INTERACTION_BLOCKED,
        interaction,
        BuiltInReasons.CLIENT,
      );
    }
    else if (this.blockBots && interaction.user.bot) {
      this.emit(
        CommandHandlerEvents.INTERACTION_BLOCKED,
        interaction,
        BuiltInReasons.BOT,
      );
    }
    else {
      return false;
    }

    return true;
  }

  async runPreTypeInhibitors(
    interaction,
  ) {
    const reason = this.inhibitorHandler
      ? await this.inhibitorHandler.test('pre', interaction)
      : null;

    if (reason != null) {
      this.emit(
        CommandHandlerEvents.INTERACTION_BLOCKED,
        interaction,
        reason,
      );
    }
    else {
      return false;
    }

    return true;
  }

  async runPostTypeInhibitors(
    interaction,
    command,
  ) {
    const event = CommandHandlerEvents.COMMAND_BLOCKED;

    if (!this.skipBuiltInPostInhibitors) {
      if (command.ownerOnly) {
        const isOwner = this.client.isOwner(interaction.user);
        if (!isOwner) {
          this.emit(
            event,
            interaction,
            command,
            BuiltInReasons.OWNER,
          );
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

  async runPermissionChecks(
    interaction,
    command,
  ) {
    const event = CommandHandlerEvents.MISSING_PERMISSIONS;

    if (command.clientPermissions) {
      if (interaction.guild) {
        if (interaction.channel?.type === ChannelType.DM) return false;
        const missing = interaction.channel
          ?.permissionsFor(interaction.guild.members.me)
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
          if (interaction.channel?.type === ChannelType.DM) return false;
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

  useInhibitorHandler(
    inhibitorHandler,
  ) {
    this.inhibitorHandler = inhibitorHandler;
    return this;
  }

  useListenerHandler(
    listenerHandler,
  ) {
    this.listenerHandler = listenerHandler;
    return this;
  }

  emitError(
    err,
    interaction,
    command,
  ) {
    if (this.listenerCount(CommandHandlerEvents.ERROR)) {
      this.emit(CommandHandlerEvents.ERROR, err, interaction, command);
      return;
    }
    throw err;
  }

  findCommand(name) {
    return this.modules.get(this.names.get(name.toLowerCase()));
  }

  getCommandName(
    interaction,
  ) {
    let commandName = interaction.commandName;
    if (interaction.options.getSubcommandGroup(false) !== null) {commandName += ` ${interaction.options.getSubcommandGroup()}`;}
    if (interaction.options.getSubcommand(false) !== null) {commandName += ` ${interaction.options.getSubcommand()}`;}
    return commandName;
  }

  isPromise(value) {
    return (
        value &&
        typeof value.then === 'function' &&
        typeof value.catch === 'function'
    );
  }
}
