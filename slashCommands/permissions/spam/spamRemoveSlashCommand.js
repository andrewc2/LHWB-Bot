const { SlashCommand } = require('discord-akairo');
const { db } = require('../../../models/db');
const { EmbedBuilder, Colors, ChannelType, ApplicationCommandOptionType } = require('discord.js');
const { isVoiceServerAndMod, permissionType } = require('../../../utilities/permissions');

module.exports = class SpamRemoveSlashCommand extends SlashCommand {
  constructor() {
    super('spamRemove', {
      name: 'spam remove',
      commandType: 'sub',
      category: 'permissions',
      parentCommand: 'spam',
      shortName: 'remove',
      prefixId: 'spamRemove',
      channel: 'guild',
      slashOptions: [
        {
          name: 'channel',
          description: 'The channel to remove as a spam channel',
          type: ApplicationCommandOptionType.Channel,
          channel_types: [ ChannelType.GuildNews, ChannelType.GuildVoice, ChannelType.GuildText ],
        },
      ],
    });
  }

  userPermissions(message) {
    return isVoiceServerAndMod(message);
  }

  async exec(interaction) {
    await interaction.deferReply();
    let channel = interaction.options.getChannel('channel', false) ?? interaction.channel;
    if (channel.isThread()) channel = channel.parent;

    db.query('SELECT * FROM permissions WHERE guild_id = ? AND channel_id = ? AND permission_type = ?', [interaction.guild.id, channel.id, permissionType.CHANNEL], function(err, row) {
      if (row.length === 0) {
        const isNotSpamEmbed = new EmbedBuilder()
          .setDescription(`**${channel.name}** is not a spam channel. Use the \`/spam add\` command to add ${channel.name} as a spam channel.`)
          .setColor(Colors.Red);
        return interaction.editReply({ embeds: [isNotSpamEmbed] });
      }

      const embed = new EmbedBuilder()
        .setDescription(`Successfully removed **${channel.name}** as a spam channel. To re-add ${channel.name} as a spam channel, use the \`/spam add\` command.`)
        .setColor(Colors.DarkBlue);

      db.query('DELETE FROM permissions WHERE guild_id = ? AND channel_id = ? and permission_type = ?', [interaction.guild.id, channel.id, permissionType.CHANNEL]);
      return interaction.editReply({ embeds: [embed] });
    });
  }
};
