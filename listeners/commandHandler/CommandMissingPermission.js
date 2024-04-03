import Listener from '../../structure/listeners/Listener.js';
import { EmbedBuilder, Colors } from 'discord.js';
import Utilities from '../../utilities/Utilities.js';

export default class CommandMissingPermission extends Listener {
  constructor() {
    super('commandMissingPermission', {
      event: 'missingPermissions',
      category: 'commandHandler',
      emitter: 'commandHandler',
    });
  }

  exec(interaction, command, type, missing) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Red);

    const getChannel = () => {
      const server = Utilities.getVoiceServer(this.client, interaction.guildId);
      const channel = server.isInStageChannel() ? server.getStageChannel() : server.getVoiceChannel();
      return channel.name;
    };

    if (type === 'client') {
      embed.setDescription(
        `I cannot use the **${command.name}** command in this server as I am missing the \`${missing.join(', ')}\` permission. Try again later.`,
      );
    }
    else {
      switch (missing) {
      case 'VoiceChannel':
        embed.setDescription(`You must be in the **${getChannel()}** voice channel in order to use the **${command.name}** command. :grinning:`);
        break;
      case 'SpamChannel':
        embed.setDescription(`The **${command.name}** command can only be used in a spam channel.`);
        break;
      default:
        embed.setDescription(`You do not have the correct permissions to use the **${command.name}** command. :confused:`);
        break;
      }
    }

    return interaction.reply({ embeds: [embed], ephemeral: true });
  }
}
