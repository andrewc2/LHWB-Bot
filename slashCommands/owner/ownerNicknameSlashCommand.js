const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');

module.exports = class OwnerNicknameSlashCommand extends SlashCommand {
  constructor() {
    super('ownerNickname', {
      name: 'owner nickname',
      parentCommand: 'owner',
      shortName: 'nickname',
      ownerOnly: true,
      category: 'owner',
      prefixId: 'nickname',
      commandType: 'sub',
      channel: 'guild',
      slashOptions: [
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

  exec(interaction) {
    const nickname = interaction.options.getString('nickname', true);
    const embed = new EmbedBuilder()
      .setColor(Colors.Green);

    void interaction.channel.guild.members.me.setNickname(nickname);
    return interaction.reply({ embeds: [embed.setDescription(`The nickname has been updated to: **${nickname}**`)] });
  }
};
