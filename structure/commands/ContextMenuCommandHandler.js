import StructureError from '../utilities/StructureError.js';import {
  BuiltInReasons,
  ContextCommandHandlerEvents,
} from '../utilities/constants.js';
import Handler from '../Handler.js';
import ContextMenuCommand from './ContextMenuCommand.js';

export default class ContextMenuCommandHandler extends Handler {

  constructor(client, options) {
    const {
      directory,
      classToHandle = ContextMenuCommand,
      extensions = ['.js', '.ts'],
      automateCategories,
      loadFilter,
    } = options ?? {};

    if (classToHandle !== ContextMenuCommand) {
      throw new StructureError(
        'INVALID_CLASS_TO_HANDLE',
        classToHandle.name,
        ContextMenuCommand.name,
      );
    }

    super(client, {
      directory,
      classToHandle,
      extensions,
      automateCategories,
      loadFilter,
    });

    this.inhibitorHandler = null;
    this.setup();
  }

  setup() {
    this.client.once('ready', () => {
      this.client.on('interactionCreate', (i) => {
        if (!i.isContextMenuCommand()) return;
        void this.handle(i);
      });
    });
  }

  async handle(
    interaction,
  ) {
    const command = this.modules.find(
      (module) => module.name === interaction.commandName,
    );

    if (!command) {
      this.emit(ContextCommandHandlerEvents.NOT_FOUND, interaction);
      return false;
    }

    try {
      if (await this.runPostTypeInhibitors(interaction, command)) {
        return false;
      }

      this.emit(
        ContextCommandHandlerEvents.STARTED,
        interaction,
        command,
      );
      const ret = await command.exec(interaction);
      this.emit(
        ContextCommandHandlerEvents.FINISHED,
        interaction,
        command,
        ret,
      );
      return true;
    }
    catch (err) {
      this.emitError(err, interaction, command);
      return false;
    }
  }

  emitError(
    err,
    interaction,
    command,
  ) {
    if (this.listenerCount(ContextCommandHandlerEvents.ERROR)) {
      this.emit(
        ContextCommandHandlerEvents.ERROR,
        err,
        interaction,
        command,
      );
      return;
    }

    throw err;
  }

  async runPostTypeInhibitors(
    interaction,
    command,
  ) {
    const event = ContextCommandHandlerEvents.BLOCKED;

    if (command.ownerOnly && !this.client.isOwner(interaction.user.id)) {
      this.emit(event, interaction, command, BuiltInReasons.OWNER);
    }

    if (command.guildOnly && !interaction.guild) {
      this.emit(event, interaction, command, BuiltInReasons.GUILD);
      return true;
    }

    const reason = this.inhibitorHandler
      ? await this.inhibitorHandler.test('post', interaction, command)
      : null;

    if (reason != null) {
      this.emit(event, interaction, command, reason);
      return true;
    }

    return false;
  }

  findCommand(name) {
    return this.modules.get(name.toLowerCase());
  }

  useInhibitorHandler(
    inhibitorHandler,
  ) {
    this.inhibitorHandler = inhibitorHandler;

    return this;
  }
}
