const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');
const { getCommandMention } = require('../../utilities/utilities');

module.exports = class LpingListSlashCommand extends SlashCommand {
  constructor() {
    super('lpingList', {
      name: 'lping list',
      prefixId: 'lpingList',
      category: 'ping',
      channel: 'guild',
      commandType: 'sub',
      parentCommand: 'lping',
      shortName: 'list',
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const client = this.client;

    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`There are no pinglists in this server. You can create a pinglist by using the ${getCommandMention(this.client, 'lping create')} command.`);

    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setTitle('Server Pinglists');

    db.query('SELECT `name` FROM pinglist WHERE guildID = ?', [interaction.guild.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
      const pings = result.map(x => x.name);
      return interaction.editReply({ embeds: [embed.setDescription(`Here are all the pinglists available in this server. Use the ${getCommandMention(client, 'lping get')} command to join one.\n\n \`${pings.join('` | `')}\``)] });
    });
  }
};
