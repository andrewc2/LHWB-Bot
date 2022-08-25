const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { commandUsage } = require('../../utilities/utilities');
const { db } = require('../../models/db');

module.exports = class EnableMessageCommand extends MessageCommand {
  constructor() {
    super('enable', {
      category: 'bot',
      aliases: ['enable'],
      ownerOnly: true,
      channel: 'guild',
      description: {
        content: 'Enables a command globally.',
        usage: 'enable [command]',
        examples: [
          'enable queue',
        ],
      },
      args: [
        {
          id: 'command',
          type: 'commandAlias',
          match: 'content',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  exec(message, { command }) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Green);

    const failEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    const isDisabled = this.client.globalCommandDisable.has(command.id);

    if (!isDisabled) {
      return message.channel.send({
        embeds: [
          failEmbed
            .setDescription(`The \`${command.id}\` command is currently not disabled globally.`),
        ],
      });
    }

    this.client.globalCommandDisable.delete(command.id);
    db.query('DELETE FROM `globalCommandDisable` WHERE commandId = ?', [command.id]);
    return message.channel.send({
      embeds: [
        embed
          .setDescription(`The \`${command.id}\` command has been enabled globally.`),
      ],
    });
  }
};
