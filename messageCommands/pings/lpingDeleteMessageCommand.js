const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors, PermissionsBitField } = require('discord.js');
const { db } = require('../../models/db');
const { commandUsage, anyUsage } = require('../../utilities/utilities');


module.exports = class LpingDeleteMessageCommand extends MessageCommand {
  constructor() {
    super('lpingDelete', {
      aliases: ['lping delete'],
      category: 'ping',
      channel: 'guild',
      userPermissions: [PermissionsBitField.Flags.ManageMessages],
      description: {
        content: 'Deletes a pinglist in a server.',
        usage: 'lping [name]',
        examples: [
          'lping chase',
        ],
      },
      args: [
        {
          id: 'name',
          type: 'lowercase',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  exec(message, args) {
    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`Uh oh! Looks like this pinglist does not exist.\nYou can view available pinglists in this server by doing ${anyUsage(message.guild, message.client, 'lping list')} or \`/lping list\``);

    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setDescription('Successfully deleted the pinglist.');

    db.query('SELECT * FROM pinglist WHERE `name` = ? AND `guildID` = ?', [args.name, message.guild.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return message.channel.send({ embeds: [failedEmbed] });
      db.query('DELETE FROM pinglist WHERE name = ? AND guildID = ?', [args.name, message.guild.id]);
      return message.channel.send({ embeds: [embed] });
    });
  }
};
