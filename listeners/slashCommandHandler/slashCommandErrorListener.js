const { Listener } = require('discord-akairo');
const { logger } = require('../../utilities/winstonLogging');
const { EmbedBuilder, Colors } = require('discord.js');

module.exports = class SlashCommandErrorListener extends Listener {
  constructor() {
    super('slashCommandError', {
      event: 'error',
      category: 'slashCommandHandler',
      emitter: 'slashCommandHandler',
    });
  }

  async exec(err, message, command) {
    logger.log('error', `SlashCommandHandler Error: ${err} With Command: ${command.id}`);

    const embed = new EmbedBuilder()
      .setDescription('An unknown error occurred. :pensive:')
      .setColor(Colors.Red);

    const repliedOrDeferred = message.interaction.deferred ?? message.interaction.replied;

    return repliedOrDeferred
      ? message.interaction.editReply({ embeds: [embed] })
      : message.interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
