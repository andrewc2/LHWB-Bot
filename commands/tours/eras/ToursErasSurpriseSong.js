import Command from '../../../structure/commands/Command.js';
import { database } from '../../../models/database.js';
import Paginator from '../../../utilities/Paginator.js';

export default class TourErasSecretSong extends Command {
  constructor() {
    super('tourErasSurpriseSong', {
      name: 'tour eras surprise-songs',
      category: 'tours',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'eras',
        shortName: 'surprise-songs',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true });

    const allSecretSongs = [];
    const [rows] = await database.promise().query('SELECT * FROM `erasTourSurpriseSongs` ORDER BY `id` DESC');

    for (const event of rows.values()) {
      allSecretSongs.push(`- ${event.erasSetlist}\n`);
    }

    const embedArray = Paginator.createEmbeds(
      allSecretSongs,
      null,
      0x586891,
      {
        name: 'The Eras Tour: Surprise Songs',
        iconURL:'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbpOLgnmNTCADiUalKW_SnfMBcxeixvolce_k6iO9EYgXT_nFpl1VAUbQJGpXff5AkivyUrPahJL3N/pubhtml',
      },
      '(g) guitar (p) piano',
      'https://cdn.lhwb.dev/i/TheErasTour.png',
      null,
      6);

    const paginator = new Paginator(interaction, embedArray, false);
    return await paginator.send();
  }
}
