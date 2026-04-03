import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType } from 'discord.js';

export default class OwnerNickname extends Command {
  constructor() {
    super('ownerNickname', {
      name: 'owner nickname',
      description: 'Change the bots nickname',
      category: 'owner',
      ownerOnly: true,
      guildOnly: true,
      options: [
        {
          name: 'nickname',
          description: 'The nickname to change the bot to',
          type: ApplicationCommandOptionType.String,
          required: true,
          max_length: 20,
        },
      ],
    });
  }

  /**
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   */
  async exec(interaction) {
    const nickname = interaction.options.getString('nickname', true);

    if (!interaction.inCachedGuild()) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            'This command can only be used in a server.',
          ),
        ],
      });
    }

    const me = interaction.guild.members.me;
    if (!me) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            "I can't find my guild member record right now.",
          ),
        ],
      });
    }

    const embed = EmbedFormatter.standardSuccessEmbed().setDescription(
      `The nickname has been updated to: **${nickname}**`,
    );

    await me.setNickname(nickname);
    return interaction.editReply({ embeds: [embed] });
  }
}
