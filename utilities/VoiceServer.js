import { ActivityType } from 'discord.js';
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice';
import {
  ADD_TO_QUEUE, CLEAR_QUEUE,
  DELETE_FROM_QUEUE,
  FIND_RANDOM_SONG, FIND_SONG_IN_QUEUE, GET_RECENT,
  INSERT_INTO_SONG_USER_LISTEN,
  INSERT_MANY_USERS,
  SEARCH_QUEUE,
  UPDATE_PLAY_COUNT,
  UPDATE_RECENT,
} from '../models/musicQueries.js';
import { database } from '../models/database.js';
import Logger from './Logger.js';
import Utilities from './Utilities.js';

export default class VoiceServer {
  /**
   * Create a new instance of a Voice Server.
   * @param client Discord.js client
   * @param filepath The base filepath of where media is located
   * @param primaryArtist The artist that should be auto-played in this voice server
   * @param channelId The channel ID of the voice channel
   * @param stageChannelId The channel ID of the stage channel
   * @param guildId The guild ID of the voice server
   */
  constructor(client, filepath, primaryArtist, channelId, stageChannelId, guildId) {
    this.client = client;
    this.filepath = filepath;
    this.primaryArtist = primaryArtist;
    this.channelId = channelId;
    this.stageChannelId = stageChannelId;
    this.guildId = guildId;
    this.isReady = false;
    this.paused = false;
    this.inStageChannel = false;
    this.channel = null;
    this.stageChannel = null;
    this.guildName = null;
    this.connection = null;
  }

  /**
   * Returns the guild ID of the voice server
   */
  getGuildId() {
    return this.guildId;
  }

  /**
   * Returns the base filepath of where media is located
   */
  getFilePath() {
    return this.filepath;
  }

  /**
   * Returns the pause state of the voice server
   */
  isPaused() {
    return this.paused;
  }

  /**
   * Returns the stage channel object of the voice server
   */
  getStageChannel() {
    return this.stageChannel;
  }

  /**
   * Returns the voice channel object of the voice server
   */
  getVoiceChannel() {
    return this.channel;
  }

  /**
   * Checks to see if the bot is currently in the stage channel
   */
  isInStageChannel() {
    return this.inStageChannel;
  }

  /**
   * Establishes the connection from the bot to the voice server
   * This is required to start playing music in the default voice channel
   */
  async establishConnection() {
    const channel = this.client.channels.cache.get(this.channelId);
    const stageChannel = this.client.channels.cache.get(this.stageChannelId);

    if (!channel || !stageChannel) {
      throw new Error(`Undefined Channel and/or Stage Channel for Guild: ${this.guildId}`);
    }

    this.channel = channel;
    this.stageChannel = stageChannel;
    this.guildName = channel.guild.name;

    this.connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    this.isReady = true;

    const song = await this.findSong();
    this.play(song);
  }

  /**
   * Reconnects the bot to the default voice channel
   */
  reestablishConnection() {
    this.connection = joinVoiceChannel({
      channelId: this.channel.id,
      guildId: this.channel.guild.id,
      adapterCreator: this.channel.guild.voiceAdapterCreator,
    });
    this.inStageChannel = false;
    this.isReady = true;
    this.unpause();
  }

  /**
   * Moves the bot to the stage channel and makes it a speaker in the channel
   * Requires Stage Manager permissions
   */
  async switchToStageChannel() {
    this.connection = joinVoiceChannel({
      channelId: this.stageChannel.id,
      guildId: this.stageChannel.guild.id,
      adapterCreator: this.stageChannel.guild.voiceAdapterCreator,
    });
    // Allow time for the bot to connect to the stage channel before making it a speaker
    this.inStageChannel = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await this.stageChannel.guild.members.me.voice.setSuppressed(false);
    this.unpause();
  }

  /**
   * Pauses music in the voice server
   */
  pause() {
    if (!this.isReady) {
      throw new Error('Voice Server is not ready.');
    }
    this.connection.state.subscription.player.pause();
    this.paused = true;
  }

  /**
   * Resumes playback of music in the voice server
   */
  unpause() {
    if (!this.isReady) {
      throw new Error('Voice Server is not ready.');
    }
    this.connection.state.subscription.player.unpause();
    this.paused = false;
  }

  /**
   * Returns the voice servers queue
   */
  async getQueue() {
    const [row] = await database.promise().query(SEARCH_QUEUE, [this.guildId]);
    return row;
  }

  /**
   * Clears the voice servers queue
   */
  clearQueue() {
    database.query(CLEAR_QUEUE, [this.guildId]);
  }

  /**
   * Checks to see if a song is queued in a voice server
   * @param id The ID of the song to check
   */
  async isSongQueued(id) {
    const [row] = await database.promise().query(FIND_SONG_IN_QUEUE, [this.guildId, id]);
    return row.length > 0;
  }

  /**
   * Adds a song to the voice servers queue
   * @param filename The filename of the song
   * @param name The name of the song
   * @param artist The artist of the song
   * @param id The ID of the song
   * @param username The username of the member requesting the song to be queued
   */
  async addToQueue(filename, name, artist, id, username) {
    const [row] = await database.promise().query(FIND_SONG_IN_QUEUE, [this.guildId, id]);
    if (row.length > 2) {
      return { success: false, reason: `${name} is already in the queue and was not added.` };
    }
    const doesFileExist = await Utilities.doesFileExist(`${this.filepath}${filename}`);
    if (doesFileExist) {
      database.query(ADD_TO_QUEUE, [id, this.guildId, username]);
      return { success: true, reason: `${name} by ${artist} has been added to the queue.` };
    }
    else {
      Logger.warn(`Path: ${filename} Name: ${name} could not be found`);
      return { success: false, reason: 'I know this song but I couldn\'t find the file. :thinking:' };
    }
  }

  /**
   * Gets the next queued song in a voice server (if available)
   */
  async getNextQueuedSong() {
    const row = await this.getQueue();
    if (row.length > 0) {
      Logger.info('There is a queue');
      Logger.info(`Path: ${row[0].path} Guild: ${this.guildName} Name: ${row[0]['official_name']} Queued By: ${row[0].queued_by} Grabbed from queue`);
      return { id: row[0]['song_detail_id'], ...row[0], guild_id: this.guildId, full_path: `${this.filepath}${row[0].path}` };
    }
    return null;
  }

  /**
   * Removes a song from the queue
   * @param id The ID of the song to dequeue
   */
  dequeue(id) {
    database.query(DELETE_FROM_QUEUE, [id, this.guildId]);
  }

  /**
   * Pulls a random song from the database by the primary artist
   */
  async randomSong() {
    const [result] = await database.promise().query(FIND_RANDOM_SONG, [this.primaryArtist]);
    if (result.length > 0) {
      const doesFileExist = await Utilities.doesFileExist(`${this.filepath}${result[0].path}`);
      if (doesFileExist) {
        Logger.info(`Path: ${result[0].path} Guild: ${this.guildName} Name: ${result[0]['official_name']} is now playing`);
        return { ...result[0], queued_by: null, guild_id: this.guildId, full_path: `${this.filepath}${result[0].path}` };
      }
      else {
        Logger.warn(`Path: ${result[0].path} Name: ${result[0]['official_name']} could not be found`);
        return await this.randomSong();
      }
    }
  }

  /**
   * Finds a song to play next
   */
  async findSong() {
    return await this.getNextQueuedSong() || await this.randomSong();
  }

  /**
   * Updates the last recently played song
   * @param id The ID of the song
   * @param queuedBy The name of who queued the song (if available)
   */
  updateRecent(id, queuedBy) {
    database.query(UPDATE_RECENT, [id, this.guildId, queuedBy]);
  }

  /**
   * Gets the most recently played song
   * @param limit The limit of how many recently played songs to fetch
   */
  async getRecent(limit) {
    const [rows] = await database.promise().query(GET_RECENT, [this.guildId, limit]);
    return rows;
  }

  /**
   * Updated playcount for track and updated song user listens for member
   * @param id The ID of the song
   * @param members The members whose playcount to update
   */
  async updatePlayCount(id, members) {
    database.query(UPDATE_PLAY_COUNT, [id]);
    const memberIds = members.map(member => [member.user.id]);
    const membersToInsert = members.map(member => [member.user.id, id]);
    await database.promise().query(INSERT_MANY_USERS, [memberIds]);
    await database.promise().query(INSERT_INTO_SONG_USER_LISTEN, [membersToInsert]);
    Logger.info(`Updated playcount for track id: ${id} and updated song user listens for: ${members.size} member(s)`);
  }

  /**
   * Skip the now playing song
   */
  async skip() {
    const recent = (await this.getRecent(1))[0];
    if (recent['queued_by'] !== null) {
      this.dequeue(recent['song_detail_id']);
    }
    setTimeout(async () => { this.play(await this.findSong()); }, 1000);
  }

  /**
   * Log what songs a user has listened to
   * @param song Song object retrieved from the database
   */
  async logUsers(song) {
    const channel = this.inStageChannel ? this.stageChannel : this.channel;
    const members = channel.members.filter(member => !member.voice.deaf);
    if (members.size > 0) await this.updatePlayCount(song.id, members);
  }

  /**
   *
   * @param song Song object retrieved from the database
   */
  play(song) {
    if (!this.isReady) {
      throw new Error('Voice Server is not ready.');
    }

    this.updateRecent(song.id, song.queued_by);
    const player = createAudioPlayer();
    const resource = createAudioResource(song.full_path);
    player.play(resource);
    this.connection.subscribe(player);

    player.on('stateChange', async (oldState, newState) => {
      Logger.info(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
      if (newState.status === AudioPlayerStatus.Idle && oldState.status !== AudioPlayerStatus.Idle) {
        await this.logUsers(song);
        if (song.queued_by !== null) this.dequeue(song.id);
        this.client.user.setActivity('Music', { type: ActivityType.Listening });
        setTimeout(async () => { this.play(await this.findSong());}, 1000);
      }
    });
  }
}
