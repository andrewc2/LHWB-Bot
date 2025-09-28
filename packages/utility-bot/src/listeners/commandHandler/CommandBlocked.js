import { Listener } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';

export default class CommandBlocked extends Listener {
  constructor() {
    super('commandBlocked', {
      event: 'commandBlocked',
      category: 'commandHandler',
      emitter: 'commandHandler',
    });
  }

  async exec(interaction, command, reason) {
    const commandName = command.name;
    const embed = EmbedFormatter.standardErrorEmbed().setDescription(
      `You cannot use the **${commandName}** command at the moment.`,
    );

    switch (reason) {
      case 'guild':
        embed.setDescription(
          `You cannot use the **${commandName}** command in DMs. Please try again in a server.`,
        );
        break;
      case 'owner':
        embed.setDescription(
          `Only the bot owner can use the **${commandName}** command.`,
        );
        break;
      case 'botBanned':
        embed.setDescription(
          `You cannot use the **${commandName}** command at the moment as you have been bot banned.`,
        );
        break;
    }

    return interaction.editReply({ embeds: [embed] });
  }
}
