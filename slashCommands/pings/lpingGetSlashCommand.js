const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');
const { autocomplete, joinPinglistButton } = require('../../commandUtilities/lpingUtilities');
const { getCommandMention } = require('../../utilities/utilities');

module.exports = class LpingGetSlashCommand extends SlashCommand {
  constructor() {
    super('lpingGet', {
      name: 'lping get',
      prefixId: 'lpingGet',
      category: 'ping',
      channel: 'guild',
      commandType: 'sub',
      parentCommand: 'lping',
      shortName: 'get',
      slashOptions: [
        {
          name: 'pinglist',
          description: 'The name of the pinglist to get',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
          max_length: 40,
        },
      ],
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const pinglist = interaction.options.getString('pinglist', true)
      .replace(/\s/g, '')
      .toLowerCase();

    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`I couldn't find a pinglist with the name ${pinglist}. You can view available pinglists in this server by using the ${getCommandMention(this.client, 'lping list')} command.`);

    const embed = new EmbedBuilder()
      .setColor('#FF69B4');

    db.query('SELECT `name`, `guildID` FROM pinglist WHERE name = ? AND guildID = ?', [pinglist, interaction.guild.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed], components: [joinPinglistButton(pinglist)] });
      db.query('SELECT u.userID, p.pingID, p.name FROM user as u INNER JOIN userPinglist as up ON u.userID = up.userID INNER JOIN pinglist as p ON p.pingID = up.pingID WHERE p.guildID = ? AND up.userID = ? AND p.name = ?', [interaction.guild.id, interaction.user.id, pinglist], function(err, result2) {
        if (result2.length > 0) return interaction.editReply({ embeds: [failedEmbed.setDescription(`You are already a part of the **${result2[0].name}** pinglist in this server.`)], components: [joinPinglistButton(pinglist)] });
        db.query('INSERT INTO userPinglist (userID, pingID) SELECT u.userID, p.pingID FROM user as u, pinglist as p WHERE u.userID = ? AND p.name = ? AND p.guildID = ?', [interaction.user.id, pinglist, interaction.guild.id]);
        return interaction.editReply({ embeds: [embed.setDescription(`You have successfully been added to the **${pinglist}** pinglist.`)], components: [joinPinglistButton(pinglist)] });
      });
    });
  }

  async autocomplete(interaction) {
    await autocomplete(interaction);
  }
};
