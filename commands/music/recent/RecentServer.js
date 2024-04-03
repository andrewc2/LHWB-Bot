import Command from '../../../structure/commands/Command.js';
import Utilities from '../../../utilities/Utilities.js';
import { EmbedBuilder } from 'discord.js';

export default class Recent extends Command {
  constructor() {
    super('recentServer', {
      name: 'recent server',
      category: 'music',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'recent',
        shortName: 'server',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const server = Utilities.getVoiceServer(this.client, interaction.guildId);

    const recent = await server.getRecent(11);
    const current = recent[0]['official_name'];
    recent.shift();

    const recentSongs = recent
      .map((song, i) => `${i + 1}. ${song['official_name']} - ${song['artist_name']}`)
      .join('\n');

    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setURL(`https://lhwb.dev/recent.php?server=${interaction.guild.id}`)
      .setTitle(`Currently playing: ${current}`)
      .setDescription(`Recently Played:\n${recentSongs}`);

    return interaction.editReply({ embeds: [embed] });
  }
}
