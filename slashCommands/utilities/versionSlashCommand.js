const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class VersionSlashCommand extends SlashCommand {
  constructor() {
    super('version', {
      name: 'version',
      commandType: 'command',
      prefixId: 'lversion',
      description: 'Displays version information for the bot',
      category: 'utilities',
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    db.query('SELECT * FROM version', function(err, rows) {
      const embed = new EmbedBuilder()
      // pink
        .setColor('#FF69B4')
        .setTitle('Patch Notes:')
        .setAuthor({
          name: `Version: ${rows[0]['versionNum']}`,
          iconURL: 'https://lhwb.dev/ts.png',
          url: 'https://github.com/andrewc2/LHWB-Bot/wiki/Change-Log',
        })
        .setDescription(`${rows[0]['patchNotes']}`)
        .setFooter({
          text: 'Please let iAndrewC know of any issues/bugs.',
          iconURL: interaction.client.user.displayAvatarURL({ forceStatic: false, extension: 'png' }),
        });
      return interaction.editReply({ embeds: [embed] });
    });
  }
};
