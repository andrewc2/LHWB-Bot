import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';
import { ChatInputCommandInteraction } from 'discord.js';

export default class Tracklist extends Command {
  constructor() {
    super('tracklist', {
      name: 'tracklist',
      description: 'View the available songs to queue',
      category: 'music',
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    const avatar = DiscordUtil.getUserAvatar(interaction.client.user!);

    const embed = EmbedFormatter.plainEmbed('#9979FF')
      .setAuthor({
        name: `${interaction.client.user.username} track-list`,
        iconURL: avatar,
        url: avatar,
      })
      .setDescription(
        'The full requestable track-list is here: https://lhwb.dev/lhwb.php',
      );

    return interaction.editReply({ embeds: [embed] });
  }
}
