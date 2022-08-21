const { MessageCommand, Argument } = require('discord-akairo');
const { EmbedBuilder, Colors, PermissionsBitField } = require('discord.js');
const { db } = require('../../models/db');
const { commandUsage, anyUsage } = require('../../utilities/utilities');


module.exports = class LpingCreateMessageCommand extends MessageCommand {
  constructor() {
    super('lpingCreate', {
      aliases: ['lping create'],
      category: 'ping',
      channel: 'guild',
      userPermissions: [PermissionsBitField.Flags.ManageMessages],
      description: {
        content: 'Create a new pinglist for a server.',
        usage: 'lping [name]',
        examples: [
          'lping chase',
        ],
      },
      args: [
        {
          id: 'name',
          type: Argument.range('lowercase', 0, 45, true),
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  exec(message, args) {
    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`Uh oh! Looks like this pinglist already exists.\nYou can view available pinglists in this server by doing ${anyUsage(message.guild, message.client, 'lping list')} or \`/lping list\``);

    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setDescription('Successfully created the pinglist.');

    db.query('SELECT * FROM pinglist WHERE `name` = ? AND `guildID` = ?', [args.name, message.guild.id], function(err, result) {
      if (err) return;
      for (const ping of result.values()) {
        if (ping.name === args.name) return message.channel.send({ embeds: [failedEmbed] });
      }
      db.query('INSERT INTO pinglist (`name`, `guildID`) VALUES (?,?)', [args.name, message.guild.id]);
      return message.channel.send({ embeds: [embed] });
    });
  }
};
