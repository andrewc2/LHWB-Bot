const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Color } = require('discord.js');

module.exports = class OwnerAvatarSlashCommand extends SlashCommand {
  constructor() {
    super('ownerAvatar', {
      name: 'owner avatar',
      parentCommand: 'owner',
      shortName: 'avatar',
      ownerOnly: true,
      category: 'owner',
      prefixId: 'lAvatar',
      commandType: 'sub',
      slashOptions: [
        {
          name: 'picture',
          description: 'The picture to change the bots avatar to',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: 'selena',
              value: 'https://i.imgur.com/7rYMWjO.png',
            },
            {
              name: 'taylor',
              value: 'https://i.imgur.com/NggyZ5P.png',
            },
            {
              name: 'test',
              value: 'https://i.imgur.com/16JHm36.png',
            },
          ],
        },
      ],
    });
  }

  exec(interaction) {
    const avatar = interaction.options.getString('picture', true);
    const embed = new EmbedBuilder()
      .setColor(Color.Green);

    void this.client.user.setAvatar(avatar);
    return interaction.reply({ embeds: [embed.setDescription('The avatar has been updated')] });
  }
};
