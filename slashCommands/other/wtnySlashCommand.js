const { SlashCommand } = require('discord-akairo');

module.exports = class WtnySlashCommand extends SlashCommand {
  constructor() {
    super('wtny', {
      name: 'wtny',
      prefixId: 'wtny',
      category: 'other',
      commandType: 'command',
      description: 'Welcomes new users to the server',
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    return interaction.editReply({ files: ['https://i.imgur.com/02RxUF4.gif'] });
  }
};
