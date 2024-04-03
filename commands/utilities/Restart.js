import Command from '../../structure/commands/Command.js';
import { EmbedBuilder, PermissionsBitField } from 'discord.js';
import Logger from '../../utilities/Logger.js';

export default class Restart extends Command {
  constructor() {
    super('restart', {
      name: 'restart',
      description: 'Restarts the bot',
      category: 'utilities',
      userPermissions: [PermissionsBitField.Flags.ManageGuild],
      deploymentDetails: {
        commandType: 'command',
      },
    });
  }

  async exec(interaction) {
    Logger.info('LHWB is restarting!');
    const embed = new EmbedBuilder()
    // red
      .setColor(16711680)
      .setDescription('LHWB is restarting!');
    return interaction.reply({ embeds: [embed] }).then(() => process.exit(-1));
  }
}
