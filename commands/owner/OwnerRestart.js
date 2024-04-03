import Command from '../../structure/commands/Command.js';
import { EmbedBuilder, PermissionsBitField } from 'discord.js';
import Logger from '../../utilities/Logger.js';

export default class Restart extends Command {
  constructor() {
    super('ownerRestart', {
      name: 'owner restart',
      category: 'owner',
      ownerOnly: true,
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'owner',
        shortName: 'restart',
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
