const { MessageCommand } = require('discord-akairo');
const { db } = require('../../../models/db');
const { EmbedBuilder, Colors } = require('discord.js');
const { commandUsage, anyUsage } = require('../../../utilities/utilities');

module.exports = class ChannelEnableMessageCommand extends MessageCommand {
  constructor() {
    super('channelEnable', {
      aliases: ['channel enable'],
      category: 'permissions',
      description: {
        content: 'Enable a command in a channel.',
        usage: 'channel enable <command>',
        examples: [
          'channel enable lping',
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

  exec(message, args) {
    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    const embed = new EmbedBuilder()
      .setColor('#FF69B4');

    const guildID = message.guild.id;
    const channelID = message.channel.id;
    const commandID = args.command.id;

    db.query('SELECT * FROM `command` WHERE `guildID` = ? AND `channelID` = ? AND `commandID` = ?', [guildID, channelID, commandID], function(err, result) {
      if (err) return;
      if (result.length < 1) {
        return message.channel.send({ embeds: [failedEmbed.setDescription(`${commandID} is not disabled. :smiley:\nTo disable use ${anyUsage(message.guild, message.client, 'channel disable commandName')}`)] });
      }
      else {
        db.query('DELETE FROM `command` WHERE `guildID` = ? AND `channelID` = ? AND `commandID` = ?', [guildID, channelID, commandID]);
        return message.channel.send({ embeds: [embed.setDescription(`${commandID} has been enabled. :smiley:\nTo disable use ${anyUsage(message.guild, message.client, 'channel disable commandName')}`)] });
      }
    });
  }
};
