import { Command } from '@lhwb/framework';
import { EmbedFormatter, Paginator } from '@lhwb/shared';
import { ChatInputCommandInteraction, PermissionsBitField } from 'discord.js';

import Utilities from '../../../modules/tool/Utilities.js';

export default class QueueShow extends Command {
  constructor() {
    super('queueShow', {
      name: 'queue show',
      description: 'View which songs are currently in the queue',
      category: 'music',
      clientPermissions: [PermissionsBitField.Flags.ViewChannel],
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    const server = Utilities.getMusicServer(this.client, interaction.guildId!);

    if (!server) {
      return interaction.editReply({
        embeds: [EmbedFormatter.notMusicServer()],
      });
    }

    const recent = (await server.getRecent(1))[0];
    const queue = await server.getQueue();

    const alreadyQueued =
      queue.length > 0 &&
      recent['queuedBy'] !== null &&
      recent['officialName'] === queue[0]['officialName'];

    if (alreadyQueued) queue.shift();

    const queuedSongs = queue.map(
      (song, i) => `${i + 1}. ${song.officialName} - ${song.artistName}\n`,
    );

    const description =
      queuedSongs.length === 0
        ? 'There is nothing else queued at the moment.'
        : 'Queued For Play:\n';

    const embedArray = Paginator.createEmbeds(
      queue.length === 0 ? [] : [description, ...queuedSongs],
      alreadyQueued
        ? `Currently Playing: ${recent['officialName']} (Queued)`
        : `Currently Playing: ${recent['officialName']}`,
      '#FF69B4',
      null,
      null,
      null,
      null,
      10,
    );

    const paginator = new Paginator(
      interaction,
      embedArray,
      this.client.logger,
      false,
      "There's nothing queued at the moment.",
    );

    return await paginator.send();
  }
}
