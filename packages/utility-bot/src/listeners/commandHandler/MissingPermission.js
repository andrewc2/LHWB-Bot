import { Listener } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';

export default class MissingPermission extends Listener {
  constructor() {
    super('missingPermission', {
      event: 'missingPermissions',
      category: 'commandHandler',
      emitter: 'commandHandler',
    });
  }

  exec(interaction, command, type, missing) {
    const embed = EmbedFormatter.standardErrorEmbed();

    if (type === 'client') {
      embed.setDescription(
        `I cannot use the **${command.name}** command in this server as I am missing the \`${missing.join(', ')}\` permission. Try again later.`,
      );
    } else {
      embed.setDescription(
        `You do not have the correct permissions to use the **${command.name}** command. :confused:`,
      );
    }

    return interaction.editReply({ embeds: [embed] });
  }
}
