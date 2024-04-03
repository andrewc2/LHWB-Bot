import Listener from '../../structure/listeners/Listener.js';
import { EmbedBuilder, Colors, Events } from 'discord.js';
import { database } from '../../models/database.js';

export default class LpingDropPinglist extends Listener {
  constructor() {
    super('lpingDropPinglist', {
      event: Events.InteractionCreate,
      category: 'lping',
      emitter: 'client',
    });
  }

  async exec(interaction) {
    if (!interaction.isButton() || !interaction.guild) return;
    if (!interaction.customId.startsWith('{')) return;
    const customId = JSON.parse(interaction.customId);
    if (customId.type !== 'drop') return;
    await interaction.deferReply({ ephemeral: true });
    const pinglist = customId.id;

    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`I couldn't find a pinglist with the name ${pinglist}. You can view available pinglists in this server by using the \`/lping list\` command.`);

    const embed = new EmbedBuilder()
      .setColor('#FF69B4');

    database.query('SELECT `name`, `guildID` FROM pinglist WHERE name = ? AND guildID = ?', [pinglist, interaction.guild.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
      database.query('SELECT u.userID, p.pingID, p.name FROM user as u INNER JOIN userPinglist as up ON u.userID = up.userID INNER JOIN pinglist as p ON p.pingID = up.pingID WHERE p.guildID = ? AND up.userID = ? AND p.name = ?', [interaction.guild.id, interaction.user.id, pinglist], function(err, result2) {
        if (result2.length < 1) return interaction.editReply({ embeds: [failedEmbed.setDescription(`You are not apart of the **${pinglist}** pinglist in this server.`)] });
        database.query('DELETE userPinglist FROM userPinglist INNER JOIN user as u On userPinglist.userID = u.userID INNER JOIN pinglist as p on userPinglist.pingID = p.pingID WHERE p.guildID = ? AND u.userID = ? AND p.name = ?', [interaction.guild.id, interaction.user.id, pinglist]);
        return interaction.editReply({ embeds: [embed.setDescription(`You have successfully been removed from the **${pinglist}** pinglist.`)] });
      });
    });
  }
}
