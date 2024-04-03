import Command from '../../../structure/commands/Command.js';
import { Colors, EmbedBuilder, escapeNumberedList } from 'discord.js';
import Utilities from '../../../utilities/Utilities.js';

export default class QueueShow extends Command {
  constructor() {
    super('queueShow', {
      name: 'queue show',
      category: 'music',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'queue',
        shortName: 'show',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const server = Utilities.getVoiceServer(this.client, interaction.guildId);

    const failEmbed = new EmbedBuilder().setColor(Colors.Red);
    const queueEmbed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setURL('https://lhwb.dev/');

    const recent = (await server.getRecent(1))[0];
    const queue = await server.getQueue();

    const formatSongs = (songQueue) => {
      return escapeNumberedList(songQueue.map((song, i) => `${i + 1}. ${song['official_name']} - ${song['artist_name']}`).join('\n'));
    };

    if (queue.length > 0 && recent['queued_by'] !== null && recent['official_name'] === queue[0]['official_name']) {
      queueEmbed.setTitle(`Currently Playing: ${recent['official_name']} (Queued)`);
      queue.shift();
      const formattedQueue = formatSongs(queue);
      if (formattedQueue.length === 0) {
        return interaction.editReply({
          embeds: [
            queueEmbed.setDescription('There\'s nothing else queued at the moment...'),
          ],
        });
      }
      else {
        return interaction.editReply({
          embeds: [
            queueEmbed.setDescription(`Queued for play:\n${formattedQueue}`),
          ],
        });
      }
    }
    else if (queue.length > 0) {
      const formattedQueue = formatSongs(queue);
      return interaction.editReply({
        embeds: [
          queueEmbed
            .setTitle(`Currently Playing: ${recent['official_name']}`)
            .setDescription(`Queued for play:\n${formattedQueue}`),
        ],
      });
    }
    else {
      return interaction.editReply({
        embeds: [
          failEmbed.setDescription('There\'s nothing queued at the moment...'),
        ],
      });
    }

  }
}
