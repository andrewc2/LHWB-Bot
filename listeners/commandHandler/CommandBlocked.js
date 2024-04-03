import Listener from '../../structure/listeners/Listener.js';
import { EmbedBuilder, Colors } from 'discord.js';

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
    const embed = new EmbedBuilder()
      .setDescription(`You cannot use the **${commandName}** command at the moment.`)
      .setColor(Colors.Red);

    switch (reason) {
    case 'guild':
      embed
        .setDescription(`You cannot use the **${commandName}** command in DMs. Please try again in a server.`);
      break;
    case 'owner':
      embed
        .setDescription(`Only the bot owner can use the **${commandName}** command.`);
      break;
    case 'botBanned':
      embed
        .setDescription(`You cannot use the **${command.name}** command at the moment as you have been bot banned.`);
      break;
    }

    return interaction.reply({ embeds: [embed], ephemeral: true });
  }
}
