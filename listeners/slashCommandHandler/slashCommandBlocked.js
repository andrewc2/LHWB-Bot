const { Listener } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');

module.exports = class SlashCommandBlocked extends Listener {
  constructor() {
    super('slashCommandBlocked', {
      event: 'slashCommandBlocked',
      category: 'slashCommandHandler',
      emitter: 'slashCommandHandler',
    });
  }

  async exec(message, command, reason) {
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
    case 'commandChannelDisabled':
      embed
        .setDescription(`The **${commandName}** command has been disabled in **${message.interaction.channel}**`);
      break;
    }

    return message.interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
