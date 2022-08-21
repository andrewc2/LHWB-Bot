const { SlashCommand } = require('discord-akairo');
const { db } = require('../../../models/db');
const { EmbedBuilder, Colors } = require('discord.js');
const { noVoiceServerAndMod, permissionType } = require('../../../utilities/permissions');

module.exports = class TrustedViewSlashCommand extends SlashCommand {
  constructor() {
    super('trustedView', {
      name: 'trusted view',
      commandType: 'sub',
      category: 'permissions',
      parentCommand: 'trusted',
      shortName: 'view',
      prefixId: 'trusted',
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
        const noRoleEmbed = new EmbedBuilder()
          .setDescription('The trusted role has not been set in this server. To set the trusted role, use the `/trusted set` command.')
          .setColor(Colors.Red);
        return interaction.editReply({ embeds: [noRoleEmbed] });
      }

      const embed = new EmbedBuilder()
        .setDescription(`The trusted role in this server is currently set to ${interaction.guild.roles.cache.get(row[0].role_id)}. To clear the trusted role, use the \`/trusted clear\` command.`)
        .setColor(Colors.Blue);

      return interaction.editReply({ embeds: [embed] });
    });
  }
};
