import { Command } from '@lhwb/framework';
import { Paginator } from '@lhwb/shared';
import { ChatInputCommandInteraction, PermissionsBitField } from 'discord.js';

export default class Albums extends Command {
  constructor() {
    super('albums', {
      name: 'albums',
      description: 'View which albums are queueable',
      category: 'music',
      clientPermissions: [PermissionsBitField.Flags.ViewChannel],
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    const albums = await this.client.database.song.getAvailableAlbums();
    const albumList = albums.map(
      (album, i) => `${i + 1}. ${album.albumName} - ${album.artistName}`,
    );

    const embedArray = Paginator.createEmbeds(
      albumList,
      'Queueable Albums:',
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
    );
    return await paginator.send();
  }
}
