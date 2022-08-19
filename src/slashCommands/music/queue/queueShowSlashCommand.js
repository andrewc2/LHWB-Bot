const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../../models/db');
const { GET_RECENT, SEARCH_QUEUE } = require('../../../models/musicQueries');
const { isVoiceServer } = require('../../../utilities/permissions');

module.exports = class QueueShowSlashCommand extends SlashCommand {
  constructor() {
    super('queueShow', {
      name: 'queue show',
      prefixId: 'queue',
      category: 'music',
      channel: 'guild',
      commandType: 'sub',
      parentCommand: 'queue',
      shortName: 'show',
    });
  }

  userPermissions(message) {
    if (isVoiceServer(message.guild.id)) return 'Server';
  }

  async exec(interaction) {
    await interaction.deferReply();
    const failEmbed = new EmbedBuilder().setColor(Colors.Red);
    const queueEmbed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setURL('https://lhwb.dev/');

    function getSongs(array, songQueue) {
      for (let num = 0; num < array.length; num++) {songQueue = songQueue + `${num + 1}. ${array[num]['official_name']}\n`;}
      return songQueue;
    }

    db.query(GET_RECENT, [interaction.guild.id, 1], function(err, result) {
      const playingSong = result[0];
      db.query(SEARCH_QUEUE, [interaction.guild.id], function(err, result2) {
        let songQueue = '';
        if (result2.length > 0 && playingSong['queued_by'] !== null && playingSong['official_name'] === result2[0]['official_name']) {
          queueEmbed.setTitle(`Currently Playing: ${playingSong['official_name']} (Queued)`);
          result2.shift();
          songQueue = getSongs(result2, songQueue);
          if (songQueue.length < 1) {
            return interaction.editReply({
              embeds: [
                queueEmbed.setDescription('There\'s nothing else queued at the moment...'),
              ],
            });
          }
          else {
            return interaction.editReply({
              embeds: [
                queueEmbed.setDescription(`Queued for play:\n${songQueue}`),
              ],
            });
          }
        }
        else if (result2.length > 0) {
          songQueue = getSongs(result2, songQueue);
          return interaction.editReply({
            embeds: [
              queueEmbed
                .setTitle(`Currently Playing: ${playingSong['official_name']}`)
                .setDescription(`Queued for play:\n${songQueue}`),
            ],
          });
        }
        else {
          return interaction.editReply({
            embeds: [
              failEmbed.setDescription('There\'s nothing queued at the moment...'),
            ],
          });
        }
      });
    });
  }
};
