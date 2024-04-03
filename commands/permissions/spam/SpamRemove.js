import Command from '../../../structure/commands/Command.js';
import { database } from '../../../models/database.js';
import { EmbedBuilder, Colors, ChannelType, ApplicationCommandOptionType } from 'discord.js';
import { permissionType } from '../../../utilities/Permission.js';

export default class SpamRemove extends Command {
  constructor() {
    super('spamRemove', {
      name: 'spam remove',
      category: 'permissions',
      options: [
        {
          name: 'channel',
          description: 'The channel to remove as a spam channel',
          type: ApplicationCommandOptionType.Channel,
          channel_types: [ ChannelType.GuildVoice, ChannelType.GuildText ],
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'spam',
        shortName: 'remove',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    let channel = interaction.options.getChannel('channel', false) ?? interaction.channel;
    if (channel.isThread()) channel = channel.parent;

    database.query('SELECT * FROM permissions WHERE guild_id = ? AND channel_id = ? AND permission_type = ?', [interaction.guild.id, channel.id, permissionType.CHANNEL], function(err, row) {
      if (row.length === 0) {
        const isNotSpamEmbed = new EmbedBuilder()
          .setDescription(`**${channel.name}** is not a spam channel. Use the \`/spam add\` command to add ${channel.name} as a spam channel.`)
          .setColor(Colors.Red);
        return interaction.editReply({ embeds: [isNotSpamEmbed] });
      }

      const embed = new EmbedBuilder()
        .setDescription(`Successfully removed **${channel.name}** as a spam channel. To re-add ${channel.name} as a spam channel, use the \`/spam add\` command.`)
        .setColor(Colors.DarkBlue);

      database.query('DELETE FROM permissions WHERE guild_id = ? AND channel_id = ? and permission_type = ?', [interaction.guild.id, channel.id, permissionType.CHANNEL]);
      return interaction.editReply({ embeds: [embed] });
    });
  }
}
