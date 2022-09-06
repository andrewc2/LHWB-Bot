const { Listener } = require('discord-akairo');
const { EmbedBuilder, Colors, Events } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class LpingJoinPinglistListener extends Listener {
  constructor() {
    super('lpingJoinPinglistListener', {
      event: Events.InteractionCreate,
      category: 'other',
      emitter: 'client',
    });
  }

  async exec(interaction) {
    if (!interaction.isButton() || !interaction.guild) return;
    if (!interaction.customId.startsWith('{')) return;
    const customId = JSON.parse(interaction.customId);
    if (customId.type !== 'ping') return;
    await interaction.deferReply({ ephemeral: true });
    const pinglist = customId.id;

    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`I couldn't find a pinglist with the name ${pinglist}. You can view available pinglists in this server by using the \`/lping list\` command.`);

    const embed = new EmbedBuilder()
      .setColor('#FF69B4');

    db.query('SELECT `name`, `guildID` FROM pinglist WHERE name = ? AND guildID = ?', [pinglist, interaction.guild.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
      db.query('SELECT u.userID, p.pingID, p.name FROM user as u INNER JOIN userPinglist as up ON u.userID = up.userID INNER JOIN pinglist as p ON p.pingID = up.pingID WHERE p.guildID = ? AND up.userID = ? AND p.name = ?', [interaction.guild.id, interaction.user.id, pinglist], function(err, result2) {
        if (result2.length > 0) return interaction.editReply({ embeds: [failedEmbed.setDescription(`You are already apart of the **${result2[0].name}** pinglist in this server.`)] });
        db.query('INSERT INTO userPinglist (userID, pingID) SELECT u.userID, p.pingID FROM user as u, pinglist as p WHERE u.userID = ? AND p.name = ? AND p.guildID = ?', [interaction.user.id, pinglist, interaction.guild.id]);
        return interaction.editReply({ embeds: [embed.setDescription(`You have successfully been added to the **${pinglist}** pinglist.`)] });
      });
    });
  }
};
