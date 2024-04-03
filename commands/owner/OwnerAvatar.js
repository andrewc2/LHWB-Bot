import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, EmbedBuilder, Colors } from 'discord.js';

export default class OwnerAvatar extends Command {
  constructor() {
    super('ownerAvatar', {
      name: 'owner avatar',
      category: 'owner',
      ownerOnly: true,
      options: [
        {
          name: 'picture',
          description: 'The picture to change the bots avatar to',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: 'selena',
              value: 'https://cdn.lhwb.dev/i/SelenaAvatar.png',
            },
            {
              name: 'taylor',
              value: 'https://cdn.lhwb.dev/i/TaylorAvatar.png',
            },
            {
              name: 'test',
              value: 'https://cdn.lhwb.dev/i/TestBotAvatar.png',
            },
          ],
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'owner',
        shortName: 'avatar',
      },
    });
  }

  exec(interaction) {
    const avatar = interaction.options.getString('picture', true);
    const embed = new EmbedBuilder()
      .setColor(Colors.Green);

    void this.client.user.setAvatar(avatar);
    return interaction.reply({ embeds: [embed.setDescription('The avatar has been updated')] });
  }
}
