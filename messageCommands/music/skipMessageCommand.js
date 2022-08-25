const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');
const { GET_RECENT } = require('../../models/musicQueries');
const { dequeue, play, randomSong, searchQueue } = require('../../utilities/music');
const { getVoiceConnection } = require('@discordjs/voice');
const { cmdRestrictions } = require('../../utilities/permissions');

module.exports = class SkipMessageCommand extends MessageCommand {
  constructor() {
    super('skip', {
      aliases: ['skip', 'lskip'],
      category: 'music',
      description: {
        content: 'Skips the current song.',
        usage: 'skip',
        examples: ['skip'],
      },
      channel: 'guild',
    });
  }

  async userPermissions(message) {
    return await cmdRestrictions(message);
  }

  async exec(message) {
    const connection = getVoiceConnection(message.guild.id);

    if (!connection) {
      return message.channel.send({ embeds: [
        new EmbedBuilder()
          .setDescription('Connection to voice channel not found.')
          .setColor(Colors.Red),
      ] });
    }

    const embed = new EmbedBuilder()
      .setDescription('Song skipped. Finding a new song... :musical_note:')
      .setColor(Colors.Green);

    const [result] = await db.promise().query(GET_RECENT, [message.guild.id, 1]);
    if (result[0]['queued_by'] !== null) {dequeue(result[0]['song_detail_id'], message.guild.id);}
    setTimeout(async () => {play(await searchQueue(message.guild) || await randomSong(message.guild), connection, this.client); }, 1000);
    return message.channel.send({ embeds: [embed] });
  }
};
