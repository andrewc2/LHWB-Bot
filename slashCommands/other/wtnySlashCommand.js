const { SlashCommand } = require('discord-akairo');

module.exports = class wtnySlashCommand extends SlashCommand {
  constructor() {
    super('wtny', {
      name: 'wtny',
      prefixId: 'wtny',
      category: 'other',
      cooldown: 30000,
      ratelimit: 1,
      commandType: 'command',
      description: 'Welcomes new users to the server.',
    });
  }

  async exec(interaction) {
    return interaction.reply({ files: ['https://i.imgur.com/02RxUF4.gif'] });
  }
};
