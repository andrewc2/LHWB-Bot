import Command from '../../../structure/commands/Command.js';
import { database } from '../../../models/database.js';
import { GET_QUEUEABLE_ALBUMS } from '../../../models/musicQueries.js';
import Paginator from '../../../utilities/Paginator.js';

export default class QueueAlbumList extends Command {
  constructor() {
    super('queueAlbumList', {
      name: 'queue album-list',
      category: 'music',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'queue',
        shortName: 'album-list',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true });

    const [row] = await database.promise().query(GET_QUEUEABLE_ALBUMS);
    const albums = row.map((album) =>
      `${album['album']} - ${album['artist_name']}\n`,
    );

    const embedArray = Paginator.createEmbeds(albums, 'Queueable Albums:', '#FF69B4', null, null, null, 'https://lhwb.dev/lhwb.php', 10);
    const paginator = new Paginator(interaction, embedArray, false);
    return await paginator.send();
  }
}