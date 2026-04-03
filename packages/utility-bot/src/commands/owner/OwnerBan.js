import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType } from 'discord.js';

export default class OwnerBan extends Command {
  constructor() {
    super('ownerBan', {
      name: 'owner ban',
      description: 'Ban a user from the bot',
      category: 'owner',
      ownerOnly: true,
      options: [
        {
          name: 'user',
          description: 'The user to bot ban',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    });
  }

  /**
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   */
  async exec(interaction) {
    const user = interaction.options.getUser('user', true);
    const botUser = this.client.user;
    const ownerIds = Array.isArray(this.client.ownerId)
      ? this.client.ownerId
      : [this.client.ownerId];
    const protectedUsers = botUser ? [...ownerIds, botUser.id] : ownerIds;

    const isProtectedEmbed = EmbedFormatter.standardErrorEmbed().setDescription(
      `${DiscordUtil.formatAsUserAndMention(user)} cannot be banned as they are protected.`,
    );

    if (protectedUsers.includes(user.id)) {
      return interaction.editReply({ embeds: [isProtectedEmbed] });
    }

    const isBanned = await this.client.cache.botBanned.isBanned(user.id);

    const alreadyBannedEmbed =
      EmbedFormatter.standardErrorEmbed().setDescription(
        `${DiscordUtil.formatAsUserAndMention(user)} has already been bot banned.`,
      );

    if (isBanned) {
      return interaction.editReply({ embeds: [alreadyBannedEmbed] });
    }

    await this.client.database.botBanned.setBotBanned(user.id);
    const bannedUsers = await this.client.database.botBanned.getBotBanned();
    await this.client.cache.botBanned.setAllBans(bannedUsers);

    const bannedEmbed = EmbedFormatter.standardSuccessEmbed().setDescription(
      `${DiscordUtil.formatAsUserAndMention(user)} has been bot banned.`,
    );

    return interaction.editReply({ embeds: [bannedEmbed] });
  }
}
