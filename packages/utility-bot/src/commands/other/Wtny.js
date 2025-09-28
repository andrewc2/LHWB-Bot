import { Command } from '@lhwb/framework';

export default class Wtny extends Command {
  constructor() {
    super('wtny', {
      name: 'wtny',
      description: 'Welcomes new users to the server',
      category: 'other',
      guildOnly: true,
    });
  }

  async exec(interaction) {
    if (interaction.guildId === '115332333745340416') {
      return interaction.editReply({
        files: ['https://cdn.lhwb.dev/i/rTSWTNY.gif'],
      });
    }
    return interaction.editReply({
      files: ['https://cdn.lhwb.dev/i/SwiftiesWTNY.gif'],
    });
  }
}
