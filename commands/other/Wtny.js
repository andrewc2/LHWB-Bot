import Command from '../../structure/commands/Command.js';

export default class Wtny extends Command {
  constructor() {
    super('wtny', {
      name: 'wtny',
      category: 'other',
      description: 'Welcomes new users to the server',
      guildOnly: true,
      deploymentDetails: {
        commandType: 'command',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    if (interaction.guildId === '115332333745340416') {
      return interaction.editReply({ files: ['https://cdn.lhwb.dev/i/rTSWTNY.gif'] });
    }
    return interaction.editReply({ files: ['https://cdn.lhwb.dev/i/SwiftiesWTNY.gif'] });
  }
}
