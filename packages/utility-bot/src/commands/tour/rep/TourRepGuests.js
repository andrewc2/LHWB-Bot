import { Command } from '@lhwb/framework';
import { EmbedBuilder } from 'discord.js';

export default class TourRepGuests extends Command {
  constructor() {
    super('tourRepGuests', {
      name: 'tour reputation guests',
      description:
        "Displays the guest list on Taylor Swift's reputation Stadium Tour",
      category: 'tours',
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(568027)
      .setAuthor({
        name: 'Special Guests',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/Taylor_Swift%27s_Reputation_Stadium_Tour#Shows',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/ReputationStadiumTour.png')
      .setDescription(
        "5-18-18 (Pasadena) There's Nothing Holdin' Me Back - Shawn Mendes\n5-19-18 (Pasadena) My My My! - Troye Sivan; Hands to Myself - Selena Gomez\n6-22-18 (London) Slow Hands - Niall Horan\n6-23-18 (London) Angels - Robbie Williams\n7-27-18 (Foxborough) Curious - Hayley Kiyoko\n8-04-18 (Toronto) Summer of 69 - Bryan Adams\n8-25-18 (Nashville) Tim McGraw - Faith Hill / Tim McGraw\n10-5-18 (Dallas) The Middle - Maren Morris\n10-6-18 (Dallas) Sugarland - Babe [full production]",
      );

    return interaction.editReply({ embeds: [embed] });
  }
}
