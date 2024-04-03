import Command from '../../structure/commands/Command.js';
import { EmbedBuilder } from 'discord.js';
import Utilities from '../../utilities/Utilities.js';

export default class Current extends Command {
  constructor() {
    super('current', {
      name: 'current',
      description: 'Shows what song is currently playing',
      guildOnly: true,
      category: 'music',
      deploymentDetails: {
        commandType: 'command',
        musicServer: true,
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const server = Utilities.getVoiceServer(this.client, interaction.guildId);

    const recent = await server.getRecent(1);
    const queuedBy = recent[0]['queued_by'];

    const embed = new EmbedBuilder()
      .setTitle(recent[0]['official_name'])
      .setDescription(`${recent[0]['album']} - ${recent[0]['artist_name']}`)
      .setThumbnail(recent[0]['album_art_url'])
      .setColor('#FF69B4');

    if (queuedBy) embed.setFooter({ text: `Queued by: ${queuedBy}` });
    return interaction.editReply({ embeds: [embed] });
  }
}
