import Command from '../../structure/commands/Command.js';
import { Colors, EmbedBuilder, PermissionsBitField } from 'discord.js';
import Utilities from '../../utilities/Utilities.js';

export default class Resume extends Command {
  constructor() {
    super('resume', {
      name: 'resume',
      description: 'Resumes music on the bot',
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
      .setDescription('Music has been resumed. :play_pause:')
      .setColor(Colors.Green);

    if (server.isPaused()) {
      server.unpause();
      return interaction.editReply({ embeds: [embed] });
    }
    else {
      return interaction.editReply({
        embeds: [
          embed
            .setDescription('Music isn\'t paused at the moment.')
            .setColor(Colors.Red),
        ],
      });
    }
  }
}
