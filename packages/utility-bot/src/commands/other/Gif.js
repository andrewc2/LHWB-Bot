import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';

export default class Gif extends Command {
  constructor() {
    super('gif', {
      name: 'gif',
      description: 'Displays a random Taylor related gif',
      category: 'other',
    });
  }

  async exec(interaction) {
    const gifs = await this.client.database.query(
      "SELECT url, type FROM media WHERE type = 'gif' ORDER BY RAND() LIMIT 1",
    );

    const noGifs = EmbedFormatter.standardErrorEmbed().setDescription(
      "Sorry, there are no gif's at the moment.",
    );

    if (gifs.length === 0) {
      return interaction.editReply({
        embeds: [noGifs],
      });
    }

    const embed = EmbedFormatter.plainEmbed('#FF69B4')
      .setImage(gifs[0].url)
      .setFooter({
        text: 'Submit gifs to be added using: /request gif [imgur url]',
      });

    return interaction.editReply({ embeds: [embed] });
  }
}
