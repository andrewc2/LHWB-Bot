const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { logger } = require('../../utilities/winstonLogging');

module.exports = class RestartMessageCommand extends MessageCommand {
  constructor() {
    super('lrestart', {
      aliases: ['lrestart', 'urestart', 'umusicrestart'],
      category: 'utilities',
      cooldown: 3000,
      ratelimit: 1,
      userPermissions: [PermissionsBitField.Flags.ManageGuild],
      description: {
        content: 'Restarts the bot',
        usage: 'lrestart',
        examples: [
          'lrestart',
        ],
      },
    });
  }

  exec(message) {
    logger.log('info', 'LHWB is restarting!');
    const embed = new EmbedBuilder()
    // red
      .setColor(16711680)
      .setDescription('LHWB is restarting!');
    return message.channel.send({ embeds: [embed] }).then(() => process.exit(-1));
  }
};
