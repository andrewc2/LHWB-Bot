const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { dequeue, play, searchQueue, randomSong } = require('../../utilities/music');
const { cmdRestrictions } = require('../../utilities/permissions');
const { db } = require('../../models/db');
const { GET_RECENT } = require('../../models/musicQueries');

module.exports = class SkipSlashCommand extends SlashCommand {
  constructor() {
    super('skip', {
      name: 'skip',
      prefixId: 'skip',
      category: 'music',
      channel: 'guild',
      commandType: 'command',
      description: 'Skips the current song',
    });
  }

  async userPermissions(message) {
    return await cmdRestrictions(message);
  }

  async exec(interaction) {
    await interaction.deferReply();
    const connection = getVoiceConnection(interaction.guild.id);

    if (!connection) {
      return interaction.editReply({ embeds: [
        new EmbedBuilder()
          .setDescription('Connection to voice channel not found.')
          .setColor(Colors.Red),
      ],
      });
    }

    const embed = new EmbedBuilder()
      .setDescription('Song skipped. Finding a new song... :musical_note:')
      .setColor(Colors.Green);

    const [result] = await db.promise().query(GET_RECENT, [interaction.guild.id, 1]);
    if (result[0]['queued_by'] !== null) {dequeue(result[0]['song_detail_id'], interaction.guild.id);}
    setTimeout(async () => {play(await searchQueue(interaction.guild) || await randomSong(interaction.guild), connection, this.client); }, 1000);
    return interaction.editReply({ embeds: [embed] });
  }
};
