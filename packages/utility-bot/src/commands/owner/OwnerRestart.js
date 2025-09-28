import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';
import { Colors } from 'discord.js';

export default class Restart extends Command {
  constructor() {
    super('ownerRestart', {
      name: 'owner restart',
      description: '',
      category: 'owner',
      ownerOnly: true,
    });
  }

  async exec(interaction) {
    this.client.logger.info(
      `Restart has been requested by ${DiscordUtil.formatAsUserAndId(interaction.user)}`,
    );
    const embed = EmbedFormatter.plainEmbed(Colors.Orange).setDescription(
      'Restarting LHWB Utility Commands. This will not restart Music or Merch Pings.',
    );

    return interaction
      .editReply({ embeds: [embed] })
      .then(() => process.exit(-1));
  }
}
