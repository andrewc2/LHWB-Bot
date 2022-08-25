const { MessageCommand, Argument } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { commandUsage } = require('../../utilities/utilities');
const { db } = require('../../models/db');

module.exports = class BotUnbanMessageCommand extends MessageCommand {
  constructor() {
    super('botUnban', {
      aliases: ['botunban', 'bunban'],
      category: 'bot',
      ownerOnly: true,
      description: {
        content: 'Unbans a user or server from using the bot.',
        usage: 'botunban <user|guild>',
        examples: [
          'botunban iAndrewC',
        ],
      },
      args: [
        {
          id: 'entity',
          type: Argument.union('user', 'guild'),
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  exec(message, { entity }) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Green);

    const failEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    const isBanned = this.client.blacklist.has(entity.id);

    if (!isBanned) {
      return message.channel.send({ embeds: [
        failEmbed
          .setDescription(`${entity} is not bot banned.`),
      ] },
      );
    }

    this.client.blacklist.delete(entity.id);
    db.query('DELETE FROM botBanList WHERE entity = ?', [entity.id]);
    return message.channel.send({ embeds: [embed.setDescription(`${entity} has been bot unbanned.`)] });
  }
};
