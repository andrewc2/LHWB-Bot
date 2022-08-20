const { MessageCommand, Flag } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { isVoiceServerAndMod, permissionType } = require('../../../utilities/permissions');
const { anyUsage } = require('../../../utilities/utilities');
const { db } = require('../../../models/db');

module.exports = class SpamMessageCommand extends MessageCommand {
  constructor() {
    super('spam', {
      aliases: ['spam'],
      category: 'permissions',
      channel: 'guild',
      description: {
        content: 'View all the spam channels in a server.',
        usage: 'spam',
        examples: [
          'spam',
        ],
      },
    });
  }

  userPermissions(message) {
    return isVoiceServerAndMod(message);
  }

  *args() {
    const method = yield {
      type: [
        ['spamAdd', 'add'],
        ['spamRemove', 'remove'],
      ],
    };
    if (method) return Flag.continue(method);
  }

  exec(message) {
    db.query('SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?', [message.guild.id, permissionType.CHANNEL], function(err, row) {
      if (row.length === 0) {
        const noChannelsEmbed = new EmbedBuilder()
          .setDescription(`There are no spam channels in this server. To add a spam channel, use the ${anyUsage(message.guild, message.client, 'spam add')} command.`)
          .setColor(Colors.Red);
        return message.channel.send({ embeds: [noChannelsEmbed] });
      }

      const spamChannels = row.map((x) => {
        const channel = message.client.channels.cache.get(x.channel_id);
        return `- ${channel.name} (${channel})`;
      });

      const embed = new EmbedBuilder()
        .setTitle('Spam Channels')
        .setDescription(spamChannels.join('/n'))
        .setColor(Colors.DarkBlue);

      return message.channel.send({ embeds: [embed] });
    });
  }
};
