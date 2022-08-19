const fs = require('fs');
const { db } = require('../models/db');
const { DELETE_FROM_QUEUE, FIND_RANDOM_SONG, UPDATE_RECENT, SEARCH_QUEUE, UPDATE_PLAY_COUNT } = require('../models/musicQueries');
const { AudioPlayerStatus, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { logger } = require('./winstonLogging');
const config = require('../../config.json');

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
	const [result] = await db.promise().query(FIND_RANDOM_SONG, [config.music.main_artist]);
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

function updatePlayCount(id) {
	db.query(UPDATE_PLAY_COUNT, [id]);
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
			if (vc.members.size > 1) updatePlayCount(result.id);
			if (result.queued_by !== null) dequeue(result.id, result.guild_id);
			setTimeout(async () => { play(await searchQueue(vc.guild) || await randomSong(vc.guild), connection, client); }, 1000);
		}
	});
}

module.exports = { searchQueue, randomSong, dequeue, play };
