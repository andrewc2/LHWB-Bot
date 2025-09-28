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

  async exec(interaction) {
    const nickname = interaction.options.getString('nickname', true);

    const embed = EmbedFormatter.standardSuccessEmbed().setDescription(
      `The nickname has been updated to: **${nickname}**`,
    );

    await interaction.channel.guild.members.me.setNickname(nickname);
    return interaction.editReply({ embeds: [embed] });
  }
}
