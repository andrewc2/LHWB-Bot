import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, EmbedBuilder, Colors } from 'discord.js';

export default class OwnerNickname extends Command {
  constructor() {
    super('ownerNickname', {
      name: 'owner nickname',
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
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'owner',
        shortName: 'nickname',
      },
    });
  }

  exec(interaction) {
    const nickname = interaction.options.getString('nickname', true);
    const embed = new EmbedBuilder()
      .setColor(Colors.Green);

    void interaction.channel.guild.members.me.setNickname(nickname);
    return interaction.reply({ embeds: [embed.setDescription(`The nickname has been updated to: **${nickname}**`)] });
  }
}
