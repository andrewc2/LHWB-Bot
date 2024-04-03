import Command from '../../structure/commands/Command.js';
import { Colors, EmbedBuilder, PermissionsBitField } from 'discord.js';
import Utilities from '../../utilities/Utilities.js';

export default class Rejoin extends Command {
  constructor() {
    super('rejoin', {
      name: 'rejoin',
      description: 'Reconnect and resume playing music in default channel',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
      category: 'utilities',
      guildOnly: true,
      deploymentDetails: {
        commandType: 'command',
        musicServer: true,
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const server = Utilities.getVoiceServer(this.client, interaction.guildId);

    if (!server.isInStageChannel()) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription('The bot is already in the main voice channel.')
            .setColor(Colors.Red),
        ],
      });
    }

    server.reestablishConnection();
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setDescription('Switched to the main voice channel.')
          .setColor('#9979FF'),
      ],
    });
  }
}
