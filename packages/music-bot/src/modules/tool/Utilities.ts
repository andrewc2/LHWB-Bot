import { FrameworkClient } from '@lhwb/framework';
import { Snowflake } from 'discord.js';

export default class Utilities {
  static getMusicServer(client: FrameworkClient, guildId: Snowflake) {
    const musicServers = client.musicServers;
    return musicServers.find(
      (musicServer) => musicServer.getGuildId() === guildId,
    );
  }
}
