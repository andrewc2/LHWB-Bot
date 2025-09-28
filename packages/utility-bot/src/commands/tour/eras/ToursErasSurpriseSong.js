import { Command } from '@lhwb/framework';
import { Paginator } from '@lhwb/shared';

export default class TourErasSurpriseSong extends Command {
  constructor() {
    super('tourErasSurpriseSong', {
      name: 'tour eras surprise-songs',
      description:
        'Displays the surprise songs from Taylor Swift The Eras Tour',
      category: 'tours',
    });
  }

  async exec(interaction) {
    const allSurpriseSongs = (
      await this.client.database.query(
        'SELECT * FROM `erasTourSurpriseSong` ORDER BY `id` DESC',
      )
    ).map((event) => `- ${event.song}\n`);

    const embedArray = Paginator.createEmbeds(
      allSurpriseSongs,
      null,
      0x586891,
      {
        name: 'The Eras Tour: Surprise Songs',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbpOLgnmNTCADiUalKW_SnfMBcxeixvolce_k6iO9EYgXT_nFpl1VAUbQJGpXff5AkivyUrPahJL3N/pubhtml',
      },
      '(g) guitar (p) piano',
      'https://cdn.lhwb.dev/i/TheErasTour.png',
      null,
      6,
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
