const { SlashCommand } = require('discord-akairo');
const { db } = require('../../../models/db');
const { EmbedBuilder, Colors } = require('discord.js');
const { isVoiceServerAndMod, permissionType } = require('../../../utilities/permissions');

module.exports = class SpamViewSlashCommand extends SlashCommand {
  constructor() {
    super('spamView', {
      name: 'spam view',
      commandType: 'sub',
      category: 'permissions',
      parentCommand: 'spam',
      shortName: 'view',
      prefixId: 'spam',
      channel: 'guild',
    });
  }

  userPermissions(message) {
    return isVoiceServerAndMod(message);
  }

  async exec(interaction) {
    await interaction.deferReply();

    db.query('SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?', [interaction.guild.id, permissionType.CHANNEL], function(err, row) {
      if (row.length === 0) {
        const noChannelsEmbed = new EmbedBuilder()
          .setDescription('There are no spam channels in this server. To add a spam channel, use the `/spam add` command.')
          .setColor(Colors.Red);
        return interaction.editReply({ embeds: [noChannelsEmbed] });
      }

      const spamChannels = row.map((x) => {
        const channel = interaction.client.channels.cache.get(x.channel_id);
        return `• ${channel.name} (${channel})`;
      });

      const embed = new EmbedBuilder()
        .setTitle('Spam Channels')
        .setDescription(spamChannels.join('/n'))
        .setColor(Colors.DarkBlue);

      return interaction.editReply({ embeds: [embed] });
    });
  }
};
