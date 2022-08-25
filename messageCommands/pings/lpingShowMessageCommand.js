const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');
const { commandUsage, anyUsage } = require('../../utilities/utilities');

const { isTrusted } = require('../../utilities/permissions');

module.exports = class LpingShowMessageCommand extends MessageCommand {
  constructor() {
    super('lpingShow', {
      aliases: ['lping show'],
      category: 'ping',
      channel: 'guild',
      description: {
        content: 'Add user to the specified pinglist.',
        usage: 'lping show [name]',
        examples: [
          'lping show chase',
        ],
      },
      args: [
        {
          id: 'pinglist',
          type: 'lowercase',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  async exec(message, args) {
    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`Uh oh! Looks like this pinglist does not exist.\nYou can view available pinglists in this server by doing ${anyUsage(message.guild, message.client, 'lping list')}`);

    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ forceStatic: false, extension: 'png' }), url: message.author.displayAvatarURL({ forceStatic: false, extension: 'png' }) })
      .setColor('#FF69B4');

    async function findPingList() {
      const [result] = await db.promise().query('SELECT `name`, `guildID` FROM pinglist WHERE name = ? AND guildID = ?', [args.pinglist, message.guild.id]);
      return result.length !== 0;
    }

    if (await findPingList() === true) {
      if (await isTrusted(message.member)) {
        const permsEmbed = new EmbedBuilder()
          .setDescription('Sorry, you don\'t have the correct permissions to view the members of a pinglist.')
          .setColor(Colors.Red);
        return message.channel.send({ embeds: [permsEmbed] });
      }

      db.query('SELECT u.userID FROM user as u INNER JOIN userPinglist as up ON u.userID = up.userID INNER JOIN pinglist as p ON p.pingID = up.pingID WHERE p.guildID = ? AND p.name = ?', [message.guild.id, args.pinglist], async function(err, result) {
        if (err) return;
        if (result.length < 1) return message.channel.send({ embeds: [failedEmbed.setDescription('It looks like nobody has this pinglist assigned. :confused:')] });
        const users = [`${args.pinglist}`];
        for (const rows of result.values()) {
          await message.guild.members.fetch({ user: rows.userID })
            .then(user => {
              users.push(user.user.toString());
            })
            .catch(() => console.error());
        }
        users.push(`- to ping this pinglist, do ${anyUsage(message.guild, message.client, `lping ${args.pinglist}`)}`);
        if (users.length < 3) return message.channel.send({ embeds: [failedEmbed.setDescription('It looks like nobody has this pinglist assigned. :confused:')] });
        const sendList = users.join(' ').toString();
        for (let i = 0; i < sendList.length; i += 4000) {
          const toSend = sendList.substring(i, Math.min(sendList.length, i + 4000));
          await message.channel.send({ embeds: [
            embed
              .addFields([
                { name: 'Total Pinglist Members Result', value: result.length.toString(), inline: true },
              ])
              .setDescription(toSend),
          ],
          });
        }
      });
    }
    else {
      return message.channel.send({ embeds: [failedEmbed.setDescription(`Uh oh! Looks like this pinglist does not exist.\nYou can view available pinglists in this server by doing ${anyUsage(message.guild, message.client, 'lping list')} or \`/lping list\``)] });
    }
  }
};
