const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { logger } = require('../../utilities/winstonLogging');

module.exports = class RestartSlashCommand extends SlashCommand {
  constructor() {
    super('restart', {
      name: 'restart',
      commandType: 'command',
      prefixId: 'lrestart',
      description: 'Restarts the bot',
      category: 'utilities',
      userPermissions: [PermissionsBitField.Flags.ManageGuild],
    });
  }

  async exec(interaction) {
    logger.log('info', 'LHWB is restarting!');
    const embed = new EmbedBuilder()
    // red
      .setColor(16711680)
      .setDescription('LHWB is restarting!');
    return interaction.reply({ embeds: [embed] }).then(() => process.exit(-1));
  }
};
