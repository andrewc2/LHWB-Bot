const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');
const { anyUsage } = require('../../utilities/utilities');


module.exports = class LpingListMessageCommand extends MessageCommand {
  constructor() {
    super('lpingList', {
      aliases: ['lping list'],
      category: 'ping',
      channel: 'guild',
      description: {
        content: 'View the available pinglists in a server.',
        usage: 'lping list',
        examples: [
          'lping list',
        ],
      },
    });
  }

  exec(message) {
    // TBD anyUsage
    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`Uh oh! Looks like there are no ping lists in this server.\nYou can create one by typing ${anyUsage(message.guild, message.client, 'lping create')} or \`/lping create [name]\``);

    const embed = new EmbedBuilder()
      .setAuthor({ name : message.author.tag, iconURL: message.author.displayAvatarURL({ forceStatic: false, extension: 'png' }), url: message.author.displayAvatarURL({ forceStatic: false, extension: 'png' }) })
      .setColor('#FF69B4')
      .setTitle('Server Pinglists');

    db.query('SELECT `name` FROM Ping WHERE guildID = ?', [message.guild.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return message.channel.send({ embeds: [failedEmbed] });
      const pings = [];
      for (const rows of result.values()) {
        pings.push(rows.name);
      }
      return message.channel.send({ embeds: [embed.setDescription(`Here are the pinglists available in this server. Use ${anyUsage(message.guild, message.client, 'lping get')} or \`/lping get [name]\` to get one.\n\n \`${pings.join('` | `')}\``)] });
    });
  }
};
