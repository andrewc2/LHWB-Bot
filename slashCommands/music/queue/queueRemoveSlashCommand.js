const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, ApplicationCommandOptionType, Colors } = require('discord.js');
const { db } = require('../../../models/db');
const { FIND_SONG_IN_QUEUE } = require('../../../models/musicQueries');
const { cmdRestrictionsNoVC } = require('../../../utilities/permissions');
const { dequeue } = require('../../../utilities/music');

module.exports = class QueueRemoveSlashCommand extends SlashCommand {
  constructor() {
    super('queueRemove', {
      name: 'queue remove',
      prefixId: 'dequeue',
      category: 'music',
      channel: 'guild',
      commandType: 'sub',
      parentCommand: 'queue',
      shortName: 'remove',
      slashOptions: [
        {
          name: 'track',
          description: 'The name of the track to remove from the queue',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async userPermissions(message) {
    return await cmdRestrictionsNoVC(message);
  }

  async exec(interaction, message) {
    await interaction.deferReply();
    const track = interaction.options.getString('track', true);
    const trackType = this.client.messageCommandHandler.resolver.type('song');
    const findTrack = await trackType(message, track);

    const failEmbed = new EmbedBuilder().setColor(Colors.Red);
    const successEmbed = new EmbedBuilder().setColor(Colors.Green);

    if (!findTrack) {
      return await interaction.editReply({
        embeds: [failEmbed.setDescription('That song could not be found. Please check the track listings (/tracks).')],
      });
    }

    db.query(FIND_SONG_IN_QUEUE, [interaction.guild.id, findTrack['song_detail_id']], function(err, result) {
      if (result.length > 0) {
        dequeue(findTrack['song_detail_id'], interaction.guild.id);
        return interaction.editReply({
          embeds: [
            successEmbed.setDescription(`${findTrack['official_name']} has been removed from the queue.`),
          ],
        });
      }
      else {
        return interaction.editReply({
          embeds: [
            failEmbed.setDescription('This song isn\'t in the queue at the moment.'),
          ],
        });
      }
    });
  }
};
