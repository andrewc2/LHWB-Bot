import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';

export default class Version extends Command {
  constructor() {
    super('version', {
      name: 'version',
      description: 'Displays version information about LosingHimWasBlue',
      category: 'utilities',
    });
  }

  async exec(interaction) {
    const versionHistory = await this.client.database.query(
      'SELECT * FROM version',
    );

    const noVersionHistory = EmbedFormatter.standardErrorEmbed().setDescription(
      'Sorry, there are no release notes at the moment.',
    );

    if (versionHistory.length === 0) {
      return interaction.editReply({
        embeds: [noVersionHistory],
      });
    }

    const latestVersion = versionHistory[0];

    const versionEmbed = EmbedFormatter.plainEmbed('#FF69B4')
      .setTitle('Patch Notes:')
      .setAuthor({
        name: `Version: ${latestVersion.versionNumber}`,
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://github.com/andrewc2/LHWB-Bot/wiki/Change-Log',
      })
      .setDescription(`${latestVersion.releaseNotes}`)
      .setFooter({
        text: 'Please /request to report of any issues/bugs.',
        iconURL: interaction.client.user.displayAvatarURL({
          forceStatic: false,
          extension: 'png',
        }),
      });

    return interaction.editReply({ embeds: [versionEmbed] });
  }
}
