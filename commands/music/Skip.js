import Command from '../../structure/commands/Command.js';
import { Colors, EmbedBuilder } from 'discord.js';
import Utilities from '../../utilities/Utilities.js';
import Permission from '../../utilities/Permission.js';

export default class Skip extends Command {
  constructor() {
    super('skip', {
      name: 'skip',
      description: 'Skips the current song',
      guildOnly: true,
      category: 'music',
      deploymentDetails: {
        commandType: 'command',
        musicServer: true,
      },
    });
  }

  async userPermissions(interaction) {
    return await Permission.musicTrustedPermissionsCheck(this.client, interaction);
  }

  async exec(interaction) {
    await interaction.deferReply();
    const server = Utilities.getVoiceServer(this.client, interaction.guildId);

    const embed = new EmbedBuilder()
      .setDescription('Song skipped. Finding a new song... :musical_note:')
      .setColor(Colors.Green);

    await server.skip();
    return interaction.editReply({ embeds: [embed] });
  }
}
