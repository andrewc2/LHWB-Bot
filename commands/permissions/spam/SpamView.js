import Command from '../../../structure/commands/Command.js';
import { EmbedBuilder, Colors } from 'discord.js';
import { database } from '../../../models/database.js';
import { permissionType } from '../../../utilities/Permission.js';

export default class SpamView extends Command {
  constructor() {
    super('spamView', {
      name: 'spam view',
      category: 'permissions',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'spam',
        shortName: 'view',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();

    database.query('SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?', [interaction.guild.id, permissionType.CHANNEL], function(err, row) {
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
}
