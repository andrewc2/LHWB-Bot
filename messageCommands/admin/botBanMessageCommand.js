const { MessageCommand, Argument } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { commandUsage } = require('../../utilities/utilities');
const { db } = require('../../models/db');
const voiceServers = require('../../voice-servers.json');

module.exports = class BotBanMessageCommand extends MessageCommand {
  constructor() {
    super('botBan', {
      aliases: ['botban', 'bban'],
      category: 'admin',
      ownerOnly: true,
      description: {
        content: 'Bans a user or server from using the bot.',
        usage: 'botban <user|guild>',
        examples: [
          'botban iAndrewC',
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

  async exec(message, { entity }) {
    const protectedUsers = [this.client.ownerID, voiceServers.map(x => x.server_id).join(', '), this.client.user.id];

    const embed = new EmbedBuilder()
      .setColor(Colors.Green);

    const failEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    if (protectedUsers.includes(entity.id)) {
      return message.channel.send({
        embeds: [
          failEmbed
            .setDescription(`${entity} cannot be bot banned as it is a protected property.`),
        ],
      });
    }

    const isBanned = this.client.blacklist.has(entity.id);

    if (isBanned) {
      return message.channel.send({
        embeds: [
          failEmbed
            .setDescription(`${entity} is already bot banned.`),
        ],
      });
    }

    this.client.blacklist.set(entity.id, entity.id);
    db.query('INSERT INTO botBanList (entity) VALUES (?)', [entity.id]);
    return message.channel.send({ embeds: [embed.setDescription(`${entity} has been bot banned.`)] });
  }
};
