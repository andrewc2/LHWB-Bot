const { MessageCommand } = require('discord-akairo');
const { commandUsage } = require('../../utilities/utilities');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class DisableMessageCommand extends MessageCommand {
  constructor() {
    super('disable', {
      aliases: ['disable'],
      category: 'bot',
      ownerOnly: true,
      channel: 'guild',
      description: {
        content: 'Disables a command globally.',
        usage: 'disable [command]',
        examples: [
          'disable queue',
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

    const guarded = ['botBan', 'botUnban', 'enable', 'disable', 'reload'];

    if (guarded.includes(command.id)) {
      return message.channel.send({
        embeds: [
          failEmbed
            .setDescription(`The \`${command.id}\` command cannot be disabled as it is an essential command.`),
        ],
      });
    }

    const isDisabled = this.client.globalCommandDisable.has(command.id);

    if (isDisabled) {
      return message.channel.send({
        embeds: [
          failEmbed
            .setDescription(`The \`${command.id}\` command is already disabled globally`),
        ],
      });
    }

    this.client.globalCommandDisable.set(command.id, command.id);
    db.query('INSERT INTO `globalCommandDisable` (commandId) VALUES (?)', [command.id]);
    return message.channel.send({
      embeds: [
        embed
          .setDescription(`The \`${command.id}\` command has been disabled globally.`),
      ],
    });
  }
};
