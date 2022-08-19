const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');
const { commandUsage } = require('../../utilities/utilities');
const { findLastFmUser } = require('../../commandUtilities/lastFmUtilities');

module.exports = class LastFmSetMessageCommand extends MessageCommand {
  constructor() {
    super('lastFmSet', {
      aliases: ['lfm set'],
      category: 'fm',
      description: {
        content: 'Sets your lastfm profile.',
        usage: 'lfm set [last.fm]',
        examples: [
          'lfm set iAndrewC',
        ],
      },
      args: [
        {
          id: 'username',
          type: 'lowercase',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  async exec(message, args) {
    const embed = new EmbedBuilder();

    const invalidUsername = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(
        'The username you have provided is invalid. For more information, visit https://www.last.fm/join.',
      );

    const addLastFm = async () => {
      const lastFmUsername = await findLastFmUser(message.author);
      if (lastFmUsername) {
        db.query('UPDATE `lastfm` SET `lastfmUsername` = ? WHERE `discordID` = ?', [args.username, message.author.id]);
        embed
          .setDescription(`Your last.fm username has been updated to ${args.username}`)
          .setColor('#FF69B4');
        return message.channel.send({ embeds: [embed] });
      }
      else {
        db.query('INSERT INTO lastfm (lastfmUsername, discordTag, discordID) VALUES (?,?,?) ', [args.username, message.author.tag, message.author.id]);
        embed
          .setColor('#FF69B4')
          .setDescription(`Your last.fm username has been set to ${args.username}.`);
        message.channel.send({ embeds: [embed] });
      }
    };


    if (args.username.length >= 2 && args.username.length <= 15) {
      if (
        !/^[a-zA-Z0-9_-]+$/.test(args.username) ||
				!/^[a-zA-Z]+$/.test(args.username.charAt(0))
      ) {return message.channel.send({ embeds: [invalidUsername] });}
      else {
        await addLastFm();
      }
    }
    else {
      return message.channel.send({ embeds: [invalidUsername] });
    }
  }
};
