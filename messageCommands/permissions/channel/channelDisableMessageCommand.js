const { MessageCommand } = require('discord-akairo');
const { db } = require('../../../models/db');
const { EmbedBuilder, Colors } = require('discord.js');
const { commandUsage, anyUsage } = require('../../../utilities/utilities');

module.exports = class ChannelDisableMessageCommand extends MessageCommand {
  constructor() {
    super('channelDisable', {
      aliases: ['channel disable'],
      category: 'permissions',
      description: {
        content: 'Disable a command in a channel.',
        usage: 'channel disable <command>',
        examples: [
          'channel disable lping',
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
    const guardedCommands = ['channelDisable', 'channelEnable', 'channel'];

    if (guardedCommands.includes(commandID)) {
      return message.channel.send({ embeds: [failedEmbed.setDescription(`${commandID} cannot be disabled as it is an essential command. :sob:`)] });
    }

    db.query('SELECT * FROM `command` WHERE `guildID` = ? AND `channelID` = ? AND `commandID` = ?', [guildID, channelID, commandID], function(err, result) {
      if (err) return;
      if (result.length > 0) {
        return message.channel.send({ embeds: [failedEmbed.setDescription(`${commandID} was already disabled. :sob:\nTo enable use ${anyUsage(message.guild, message.client, 'channel enable commandName')}`)] });

      }
      else {
        db.query('INSERT INTO `command` (`guildID`, `channelID`, `commandID`) VALUES (?,?,?)', [guildID, channelID, commandID]);
        return message.channel.send({ embeds: [embed.setDescription(`${commandID} has been disabled. :smiley:\nTo enable use ${anyUsage(message.guild, message.client, 'channel enable commandName')}`)] });
      }
    });
  }
};
