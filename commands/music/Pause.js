import Command from '../../structure/commands/Command.js';
import { Colors, EmbedBuilder, PermissionsBitField } from 'discord.js';
import Utilities from '../../utilities/Utilities.js';

export default class Pause extends Command {
  constructor() {
    super('pause', {
      name: 'pause',
      description: 'Pauses music on the bot',
      guildOnly: true,
      category: 'music',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
      deploymentDetails: {
        commandType: 'command',
        musicServer: true,
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const server = Utilities.getVoiceServer(this.client, interaction.guildId);

    const embed = new EmbedBuilder()
      .setDescription('Music has been paused. :pause_button:')
      .setColor(Colors.Green);

    if (server.isPaused()) {
      return interaction.editReply({
        embeds: [
          embed
            .setDescription('Music is already paused.')
            .setColor(Colors.Red),
        ],
      });
    }
    else {
      server.pause();
      return interaction.editReply({ embeds: [embed] });
    }
  }
}
