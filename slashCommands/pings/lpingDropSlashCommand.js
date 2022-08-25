const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');
const { autocomplete } = require('../../commandUtilities/lpingUtilities');

module.exports = class LpingDropSlashCommand extends SlashCommand {
  constructor() {
    super('lpingDrop', {
      name: 'lping drop',
      prefixId: 'lpingDrop',
      category: 'ping',
      channel: 'guild',
      commandType: 'sub',
      parentCommand: 'lping',
      shortName: 'drop',
      slashOptions: [
        {
          name: 'pinglist',
          description: 'The name of the pinglist to drop',
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
      .setDescription(`I couldn't find a pinglist with the name ${pinglist}. You can view available pinglists in this server by using the \`/lping list\` command.`);

    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ forceStatic: false, extension: 'png' }), url: interaction.user.displayAvatarURL({ forceStatic: false, extension: 'png' }) })
      .setColor('#FF69B4');

    db.query('SELECT `name`, `guildID` FROM pinglist WHERE name = ? AND guildID = ?', [pinglist, interaction.guild.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
      db.query('SELECT u.userID, p.pingID, p.name FROM user as u INNER JOIN userPinglist as up ON u.userID = up.userID INNER JOIN pinglist as p ON p.pingID = up.pingID WHERE p.guildID = ? AND up.userID = ? AND p.name = ?', [interaction.guild.id, interaction.user.id, pinglist], function(err, result2) {
        if (result2.length < 1) return interaction.editReply({ embeds: [failedEmbed.setDescription(`You are not apart of the **${pinglist}** pinglist in this server.`)] });
        db.query('DELETE userPinglist FROM userPinglist INNER JOIN user as u On userPinglist.userID = u.userID INNER JOIN pinglist as p on userPinglist.pingID = p.pingID WHERE p.guildID = ? AND u.userID = ? AND p.name = ?', [interaction.guild.id, interaction.user.id, pinglist]);
        return interaction.editReply({ embeds: [embed.setDescription(`You have successfully been removed from the **${pinglist}** pinglist.`)] });
      });
    });
  }

  async autocomplete(interaction) {
    await autocomplete(interaction);
  }
};
