const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');
const { findLastFmUser } = require('../../commandUtilities/lastFmUtilities');
const { anyUsage } = require('../../utilities/utilities');

module.exports = class LastFmClearMessageCommand extends MessageCommand {
  constructor() {
    super('lastFmClear', {
      aliases: ['lfm clear'],
      category: 'fm',
      description: {
        content: 'Clears your Last.FM username from the database.',
        usage: 'lfm clear',
        examples: [
          'lfm clear',
        ],
      },
    });
  }

  async exec(message) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`You currently don't have a lastfm username set.\nYou can set your username by using the ${anyUsage(message.guild, message.client, 'lfm set')} command`);

    const lastFmUsername = await findLastFmUser(message.author);
    if (!lastFmUsername) {
      return message.channel.send({ embeds: [embed] });
    }
    else {
      db.query('DELETE FROM lastfm WHERE discordID=?', [message.author.id]);
      embed
        .setColor('#FF69B4')
        .setDescription('Your last.fm username has been successfully cleared!');
      message.channel.send({ embeds: [embed] });
    }
  }
};
