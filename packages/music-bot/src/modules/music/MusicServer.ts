import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  VoiceConnection,
} from '@discordjs/voice';
import { FrameworkClient } from '@lhwb/framework';
import { Song, Utilities } from '@lhwb/shared';
import {
  ActivityType,
  Collection,
  GuildMember,
  Snowflake,
  VoiceBasedChannel,
} from 'discord.js';

export default class MusicServer {
  private client: FrameworkClient;
  private readonly filepath: string;
  private readonly primaryArtist: string;
  private readonly channelId: Snowflake;
  private readonly stageChannelId: Snowflake;
  private readonly guildId: Snowflake;
  private isReady: boolean;
  private paused: boolean;
  private inStageChannel: boolean;
  private channel: VoiceBasedChannel | null;
  private stageChannel: VoiceBasedChannel | null;
  private guildName: string | null;
  private connection: VoiceConnection | null;
  private player: AudioPlayer | null;

  /**
   * Create a new instance of a Music Server.
   * @param client Discord.js client
   * @param filepath The root filepath of where media is located
   * @param primaryArtist The artist that should be auto-played in this music server
   * @param channelId The channel ID of the voice channel
   * @param stageChannelId The channel ID of the stage channel
   * @param guildId The guild ID of the music server
   */
  constructor(
    client: FrameworkClient,
    filepath: string,
    primaryArtist: string,
    channelId: Snowflake,
    stageChannelId: Snowflake,
    guildId: Snowflake,
  ) {
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
    this.player = null;
  }

  /**
   * Returns the guild ID of the music server
   */
  public getGuildId() {
    return this.guildId;
  }

  /**
   * Returns the root filepath of where media is located
   */
  public getFilePath() {
    return this.filepath;
  }

  /**
   * Returns the pause state of the music server
   */
  public isPaused() {
    return this.paused;
  }

  /**
   * Returns the stage channel object of the music server
   */
  public getStageChannel() {
    return this.stageChannel;
  }

  /**
   * Returns the voice channel object of the music server
   */
  public getVoiceChannel() {
    return this.channel;
  }

  /**
   * Checks to see if the bot is currently in the stage channel
   */
  public isInStageChannel() {
    return this.inStageChannel;
  }

  /**
   * Establishes the connection from the bot to the music server
   * This is required to start playing music in the default voice channel
   */
  public async establishConnection() {
    const channel = this.client.channels.cache.get(this.channelId);
    const stageChannel = this.client.channels.cache.get(this.stageChannelId);

    if (!channel || !stageChannel) {
      throw new Error(
        `Undefined Channel and/or Stage Channel for Guild: ${this.guildId}`,
      );
    }

    if (!channel.isVoiceBased() || !stageChannel.isVoiceBased()) {
      throw new Error(`Channel must be a Voice based channel`);
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
    await this.play(song);
  }

  /**
   * Reconnects the bot to the default voice channel
   */
  public reestablishConnection() {
    this.connection = joinVoiceChannel({
      channelId: this.channel!.id,
      guildId: this.channel!.guild.id,
      adapterCreator: this.channel!.guild.voiceAdapterCreator,
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
      channelId: this.stageChannel!.id,
      guildId: this.stageChannel!.guild.id,
      adapterCreator: this.stageChannel!.guild.voiceAdapterCreator,
    });
    // Allow time for the bot to connect to the stage channel before making it a speaker
    this.inStageChannel = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await this.stageChannel?.guild.members.me?.voice.setSuppressed(false);
    this.unpause();
  }

  /**
   * Pauses music in the music server
   */
  public pause() {
    if (!this.isReady) {
      throw new Error('Music Server is not ready.');
    }
    this.player?.pause();
    this.paused = true;
  }

  /**
   * Resumes playback of music in the music server
   */
  public unpause() {
    if (!this.isReady) {
      throw new Error('Music Server is not ready.');
    }
    this.player?.unpause();
    this.paused = false;
  }

  /**
   * Returns the music servers queue
   */
  public async getQueue() {
    return await this.client.database.queue.searchGuildQueue(this.guildId);
  }

  /**
   * Clears the music servers queue
   */
  public async clearQueue() {
    await this.client.database.queue.clearGuildQueue(this.guildId);
  }

  /**
   * Checks to see if a song is queued in a music server
   * @param id The ID of the song to check
   */
  public async isSongQueued(id: number) {
    const queue = await this.client.database.queue.getSongFromQueue(
      id,
      this.guildId,
    );
    return queue.length > 0;
  }

  /**
   * Adds a song to the music servers queue
   * @param filename The filename of the song
   * @param name The name of the song
   * @param artist The artist of the song
   * @param id The ID of the song
   * @param username The username of the member requesting the song to be queued
   */
  public async addToQueue(
    filename: string,
    name: string,
    artist: string,
    id: number,
    username: string,
  ) {
    const queue = await this.client.database.queue.getSongFromQueue(
      id,
      this.guildId,
    );
    if (queue.length > 2) {
      return {
        success: false,
        reason: `${name} is already in the queue and was not added.`,
      };
    }
    const doesFileExist = await Utilities.doesFileExist(
      `${this.filepath}${filename}`,
    );
    if (doesFileExist) {
      await this.client.database.queue.addToGuildQueue(
        id,
        this.guildId,
        username,
      );
      return {
        success: true,
        reason: `${name} by ${artist} has been added to the queue.`,
      };
    } else {
      this.client.logger.info(`Path for ${name} is incorrect. (${filename})`);
      return {
        success: false,
        reason: "I know this song but I couldn't find the file.",
      };
    }
  }

  /**
   * Gets the next queued song in a music server (if available)
   */
  public async getNextQueuedSong(): Promise<MusicServerSong | null> {
    const queue = await this.getQueue();
    if (queue.length > 0) {
      this.client.logger.info(
        `${queue[0]['officialName']} grabbed from queue for guild ${this.guildName} (${this.guildId}) - Queued by ${queue[0].queuedBy}`,
      );
      return {
        id: queue[0].songId,
        ...queue[0],
        guildId: this.guildId,
        fullPath: `${this.filepath}${queue[0].path}`,
      };
    }
    return null;
  }

  /**
   * Removes a song from the queue
   * @param id The ID of the song to dequeue
   */
  public async dequeue(id: number) {
    await this.client.database.queue.deleteFromGuildQueue(id, this.guildId);
  }

  /**
   * Pulls a random song from the database by the primary artist
   */
  public async randomSong(): Promise<MusicServerSong> {
    const song = await this.client.database.song.getRandomSongByArtist(
      this.primaryArtist,
    );
    const doesFileExist = await Utilities.doesFileExist(
      `${this.filepath}${song.path}`,
    );
    if (doesFileExist) {
      this.client.logger.info(
        `${song['officialName']} randomly picked for guild ${this.guildName} (${this.guildId})`,
      );
      return {
        ...song,
        queuedBy: undefined,
        guildId: this.guildId,
        fullPath: `${this.filepath}${song.path}`,
      };
    } else {
      this.client.logger.info(
        `Path for ${song['officialName']} is incorrect. (${song['path']})`,
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return await this.randomSong();
    }
  }

  /**
   * Finds a song to play next
   */
  private async findSong() {
    return (await this.getNextQueuedSong()) || (await this.randomSong());
  }

  /**
   * Updates the last recently played song
   * @param id The ID of the song
   * @param queuedBy The name of who queued the song (if available)
   */
  private async updateRecent(id: number, queuedBy?: string) {
    await this.client.database.guild.updateGuildSongHistory(
      id,
      this.guildId,
      queuedBy,
    );
  }

  /**
   * Gets the most recently played song
   * @param limit The limit of how many recently played songs to fetch
   */
  public async getRecent(limit: number) {
    return this.client.database.guild.getGuildSongHistory(this.guildId, limit);
  }

  /**
   * Updated play count for track and updated song user listens for member
   * @param id The ID of the song
   * @param members The members whose play count to update
   */
  private async updatePlayCount(
    id: number,
    members: Collection<Snowflake, GuildMember>,
  ) {
    await this.client.database.song.updatePlayCount(id);
    const memberIdList = members.map((member) => [member.user.id, id]);
    await this.client.database.user.updateUserSongHistory(memberIdList);
    this.client.logger.info(
      `Play count for song ${id} updated for ${members.size} members.`,
    );
  }

  /**
   * Skip the now playing song
   */
  public async skip() {
    const recent = (await this.getRecent(1))[0];
    if (recent.queuedBy !== null) {
      await this.dequeue(recent.songId);
    }
    setTimeout(async () => {
      await this.play(await this.findSong());
    }, 1000);
  }

  /**
   * Log what songs a user has listened to
   * @param song Song object retrieved from the database
   */
  private async logUsers(song: MusicServerSong) {
    const channel = (this.inStageChannel ? this.stageChannel : this.channel)!;
    const members = channel.members.filter((member) => !member.voice.deaf);
    if (members.size > 0) await this.updatePlayCount(song.id, members);
  }

  /**
   *
   * @param song Song object retrieved from the database
   */
  private async play(song: MusicServerSong) {
    if (!this.isReady || !this.connection) {
      throw new Error('Music Server is not ready.');
    }

    await this.updateRecent(song.id, song.queuedBy);

    const resource = createAudioResource(song.fullPath, {
      metadata: {
        name: song.officialName,
      },
    });

    this.player = createAudioPlayer();
    this.player.play(resource);
    this.connection.subscribe(this.player);

    this.player.on(AudioPlayerStatus.Idle, async () => {
      await this.logUsers(song);
      if (song.queuedBy !== null) await this.dequeue(song.id);
      this.client.user?.setActivity('Music', {
        type: ActivityType.Listening,
      });
      setTimeout(async () => {
        await this.play(await this.findSong());
      }, 1000);
    });
  }
}

interface MusicServerSong extends Song {
  queuedBy: string | undefined;
  guildId: Snowflake;
  fullPath: string;
}

export interface MusicServerInterface {
  client: FrameworkClient;
  root_filepath: string;
  primary_artist: string;
  voice_channel_id: Snowflake;
  stage_channel_id: Snowflake;
  guild_id: Snowflake;
}
