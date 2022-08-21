const { SlashCommand } = require('discord-akairo');
const { db } = require('../../../models/db');
const { EmbedBuilder, Colors } = require('discord.js');
const { noVoiceServerAndMod, permissionType } = require('../../../utilities/permissions');

module.exports = class TrustedClearSlashCommand extends SlashCommand {
  constructor() {
    super('trustedClear', {
      name: 'trusted clear',
      commandType: 'sub',
      category: 'permissions',
      parentCommand: 'trusted',
      shortName: 'clear',
      prefixId: 'trustedClear',
      channel: 'guild',
    });
  }

  userPermissions(message) {
    return noVoiceServerAndMod(message);
  }

  async exec(interaction) {
    await interaction.deferReply();
    db.query('SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?', [interaction.guild.id, permissionType.ROLE], function(err, row) {
      if (row.length === 0) {
        const noTrustedRole = new EmbedBuilder()
          .setDescription('There is no trusted role set in this server. To set a trusted role, use the `/trusted set` command.')
          .setColor(Colors.Red);
        return interaction.editReply({ embeds: [noTrustedRole] });
      }

      const embed = new EmbedBuilder()
        .setDescription('Successfully cleared the trusted role. To reset the trusted role, use the `/trusted set` command.')
        .setColor(Colors.Blue);

      db.query('DELETE FROM permissions WHERE guild_id = ? and permission_type = ?', [interaction.guild.id, permissionType.ROLE]);
      return interaction.editReply({ embeds: [embed] });
    });
  }
};
