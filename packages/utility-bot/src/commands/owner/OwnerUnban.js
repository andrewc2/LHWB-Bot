import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType } from 'discord.js';

export default class OwnerUnban extends Command {
  constructor() {
    super('ownerUnban', {
      name: 'owner unban',
      description: 'Unban a user from the bot',
      category: 'owner',
      ownerOnly: true,
      options: [
        {
          name: 'user',
          description: 'The user to bot unban',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    });
  }

  async exec(interaction) {
    const user = interaction.options.getUser('user');

    const isBanned = await this.client.cache.botBanned.isBanned(user.id);

    const neverBannedEmbed = EmbedFormatter.standardErrorEmbed().setDescription(
      `${DiscordUtil.formatAsUserAndMention(user)} is not bot banned.`,
    );

    if (!isBanned) {
      return interaction.editReply({ embeds: [neverBannedEmbed] });
    }

    await this.client.database.botBanned.deleteBotBanned(user.id);
    const bannedUsers = await this.client.database.botBanned.getBotBanned();
    await this.client.cache.botBanned.setAllBans(bannedUsers);

    const unbannedEmbed = EmbedFormatter.standardSuccessEmbed().setDescription(
      `${DiscordUtil.formatAsUserAndMention(user)} has been bot unbanned.`,
    );

    return interaction.editReply({ embeds: [unbannedEmbed] });
  }
}
