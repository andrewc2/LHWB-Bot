const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class DebtCounterCommand extends SlashCommand {
  constructor() {
    super('debtCounter', {
      name: 'debt-counter',
      prefixId: 'debtCounter',
      category: 'other',
      commandType: 'command',
      description: 'Displays the number of oof\'s from WetPatootie',
    });
  }

  async exec(interaction) {
    const failEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    const successEmbed = new EmbedBuilder()
      .setColor('#eb4034');

    db.query('SELECT * FROM counters WHERE word=\'oof\'', function(err, rows) {
      if (rows[0] == null) {
        return interaction.reply({ embeds: [failEmbed.setDescription('There was an error retrieving the oof counter.')] });
      }
      else {
        return interaction.reply({ embeds: [successEmbed
          .setAuthor({
            name: `${rows[0]['user']}'s oof counter`,
            iconURL: 'https://lhwb.dev/ts.png',
            url: 'https://turtlebyte.github.io/oofdebt/',
          })
          .setDescription(`Total: ${rows[0]['counter']}`)
          .setFooter({ text: `As of ${rows[0]['lastUsed']}` })] });
      }
    });
  }
};
