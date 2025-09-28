import { Command } from '@lhwb/framework';
import { EmbedBuilder } from 'discord.js';

export default class Tour1989SurpriseSong extends Command {
  constructor() {
    super('tour1989SurpriseSong', {
      name: 'tour 1989 surprise-songs',
      description:
        "Displays the surprise songs from Taylor Swift's 1989 World Tour",
      category: 'tours',
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(568027)
      .setAuthor({
        name: '1989 World Tour Surprise Songs',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=3d0a56f',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/1989WorldTour.png')
      .setDescription(
        "6-30-15 Holy Ground (Dublin N2)\n7-19-15 Mean (Chicago N2)\n8-1-15 Sparks Fly (Vancouver)\n8-8-15 Mean (Seattle)\n8-14-15 Should've Said No (Santa Clara N1)\n8-15-15 Never Grow Up (Santa Clara N2)\n8-17-15 Ronan (Glendale N1)\n8-22-15 All Too Well (LA N1)\n8-23-15 White Horse (Duet with Uzo Aduba) (LA N2)\n8-26-15 Mean (LA N5)\n9-9-15 Mean (Houston)\n9-12-15 Mean (St. Paul)\n9-17-15 Red (Columbus N1)\n12-5-15 Mine (Brisbane)\n\nMost other shows alternated between 1 or 2 of these three songs: (All You Had to Do Was Stay / Fifteen / You Belong With Me) ",
      );

    return interaction.editReply({ embeds: [embed] });
  }
}
