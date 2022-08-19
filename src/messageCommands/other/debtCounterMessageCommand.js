const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class DebtCounterMessageCommand extends MessageCommand {
  constructor() {
    super('debtCounter', {
      aliases: ['debtcounter', 'oofcounter'],
      category: 'other',
      description: {
        content: 'Displays the number of oof\'s from WetPatootie.',
        usage: 'debtcounter',
        examples: [
          'debtcounter',
        ],
      },
    });
  }

  exec(message) {
    const failEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    const successEmbed = new EmbedBuilder()
      .setColor('#eb4034');

    db.query('SELECT * FROM counters WHERE word=\'oof\'', function(err, rows) {
      if (rows[0] == null) {
        message.channel.send({ embeds: [failEmbed.setDescription('There was an error retrieving the oof counter.')] });
      }
      else {
        message.channel.send({ embeds: [successEmbed
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
