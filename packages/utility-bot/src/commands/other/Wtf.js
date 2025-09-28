import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';

export default class Wtf extends Command {
  constructor() {
    super('wtf', {
      name: 'wtf',
      description: 'Displays a random saved or submitted !get wtf',
      category: 'other',
    });
  }

  async exec(interaction) {
    const gifs = await this.client.database.query(
      "SELECT url, type FROM media WHERE type = 'wtf' ORDER BY RAND() LIMIT 1",
    );

    const noGifs = EmbedFormatter.standardErrorEmbed().setDescription(
      "Sorry, there are no wtf gif's at the moment.",
    );

    if (gifs.length === 0) {
      return interaction.editReply({
        embeds: [noGifs],
      });
    }

    const embed = EmbedFormatter.plainEmbed('#FF69B4')
      .setImage(gifs[0].url)
      .setFooter({
        text: "Submit wtf's to be added using: /request wtf [imgur url]",
      });

    return interaction.editReply({ embeds: [embed] });
  }
}
