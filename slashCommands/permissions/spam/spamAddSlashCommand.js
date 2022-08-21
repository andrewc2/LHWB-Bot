const { SlashCommand } = require('discord-akairo');
const { db } = require('../../../models/db');
const { EmbedBuilder, Colors, ChannelType, ApplicationCommandOptionType } = require('discord.js');
const { isVoiceServerAndMod, permissionType } = require('../../../utilities/permissions');

module.exports = class SpamAddSlashCommand extends SlashCommand {
  constructor() {
    super('spamAdd', {
      name: 'spam add',
      commandType: 'sub',
      category: 'permissions',
      parentCommand: 'spam',
      shortName: 'add',
      prefixId: 'spamAdd',
      channel: 'guild',
      slashOptions: [
        {
          name: 'channel',
          description: 'The channel to add as a spam channel',
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

    const [row] = await db.promise().query('SELECT COUNT(channel_id) AS NumberOfChannels FROM `permissions` WHERE guild_id = ? AND permission_type = ?', [interaction.guild.id, permissionType.CHANNEL]);

    if (row[0]['NumberOfChannels'] >= 10) {
      const maxLimit = new EmbedBuilder()
        .setDescription('Sorry, you\'ve reached the limit of channels that can be set as spam channels. Use the `/spam remove` command to remove a spam channel.')
        .setColor(Colors.Red);
      return interaction.editReply({ embeds: [maxLimit] });
    }

    db.query('SELECT * FROM permissions WHERE guild_id = ? AND channel_id = ? AND permission_type = ?', [interaction.guild.id, channel.id, permissionType.CHANNEL], function(err, row2) {
      if (row2.length > 0) {
        const isSpamAlreadyEmbed = new EmbedBuilder()
          .setDescription(`**${channel.name}** is already a spam channel. Use the \`/spam remove\` command to remove ${channel.name} as a spam channel.`)
          .setColor(Colors.Red);
        return interaction.editReply({ embeds: [isSpamAlreadyEmbed] });
      }

      const embed = new EmbedBuilder()
        .setDescription(`Successfully made **${channel.name}** a spam channel. To remove ${channel.name} as a spam channel, use the \`/spam remove\` command.`)
        .setColor(Colors.DarkBlue);

      db.query('INSERT INTO permissions (guild_id, channel_id, permission_type) VALUES (?,?,?)', [interaction.guild.id, channel.id, permissionType.CHANNEL]);
      return interaction.editReply({ embeds: [embed] });
    });
  }
};
