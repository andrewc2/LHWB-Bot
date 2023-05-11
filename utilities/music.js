const fs = require('fs');
const { AudioPlayerStatus, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { ActivityType } = require('discord.js');
const { db } = require('../models/db');
const {
  DELETE_FROM_QUEUE,
  FIND_RANDOM_SONG,
  UPDATE_RECENT,
  SEARCH_QUEUE,
  UPDATE_PLAY_COUNT,
  INSERT_INTO_SONG_USER_LISTEN,
  INSERT_MANY_USERS,
} = require('../models/musicQueries');
const { logger } = require('./winstonLogging');
const config = require('../config.json');
const voiceServers = require('../voice-servers.json');

async function searchQueue(guild) {
  const [result] = await db.promise().query(SEARCH_QUEUE, [guild.id]);
  if (result.length > 0) {
    logger.log('info', 'There is a queue');
    logger.log('info', `Path: ${result[0].path} Guild: ${guild.name} Name: ${result[0]['official_name']} Queued By: ${result[0].queued_by} Grabbed from queue`);
    return { id: result[0]['song_detail_id'], ...result[0], guild_id: guild.id, full_path: `${config.music.filepath}${result[0].path}` };
  }
  return null;
}

async function randomSong(guild) {
  const server = voiceServers.find(voiceServer => voiceServer.server_id === guild.id);
  const [result] = await db.promise().query(FIND_RANDOM_SONG, [server.primary_artist]);
  if (result.length > 0) {
    fs.access(`${config.music.filepath}${result[0].path}`, fs.constants.F_OK, async (err) => {
      if (err) {
        logger.log('error', `Path: ${result[0].path} Name: ${result[0]['official_name']} could not be found`);
        return await randomSong(guild);
      }
    });
    logger.log('info', `Path: ${result[0].path} Guild: ${guild.name} Name: ${result[0]['official_name']} is now playing`);
    return { ...result[0], queued_by: null, guild_id: guild.id, full_path: `${config.music.filepath}${result[0].path}` };
  }
  return await randomSong(guild);
}

function dequeue(id, guildId) {
  db.query(DELETE_FROM_QUEUE, [id, guildId]);
}

function updateRecent(songId, guildId, queuedBy) {
  db.query(UPDATE_RECENT, [songId, guildId, queuedBy]);
}

async function updatePlayCount(trackId, members) {
  db.query(UPDATE_PLAY_COUNT, [trackId]);
  const memberIds = members.map(member => [member.user.id]);
  const membersToInsert = members.map(member => [member.user.id, trackId]);
  await db.promise().query(INSERT_MANY_USERS, [memberIds]);
  await db.promise().query(INSERT_INTO_SONG_USER_LISTEN, [membersToInsert]);
  logger.log('info', `Updated playcount for track id: ${trackId} and updated song user listens for: ${members.size} member(s)`);
}

function play(result, connection, client) {
  updateRecent(result.id, result.guild_id, result.queued_by);
  const player = createAudioPlayer();
  const resource = createAudioResource(result.full_path);
  player.play(resource);
  connection.subscribe(player);

  player.on('stateChange', async (oldState, newState) => {
    logger.log('info', `Audio player transitioned from ${oldState.status} to ${newState.status}`);
    if (newState.status === AudioPlayerStatus.Idle && oldState.status !== AudioPlayerStatus.Idle) {
      const vc = client.channels.cache.get(connection.joinConfig.channelId);
      const members = vc.members.filter(member => !member.voice.deaf);
      if (members.size > 0) await updatePlayCount(result.id, members);
      if (result.queued_by !== null) dequeue(result.id, result.guild_id);
      client.user.setActivity('Music', { type: ActivityType.Listening });
      setTimeout(async () => { play(await searchQueue(vc.guild) || await randomSong(vc.guild), connection, client); }, 1000);
    }
  });
}

module.exports = { searchQueue, randomSong, dequeue, play };
