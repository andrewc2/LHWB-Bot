const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors, PermissionsBitField } = require('discord.js');
const { db } = require('../../models/db');
const { getCommandMention } = require('../../utilities/utilities');

module.exports = class LpingDeleteSlashCommand extends SlashCommand {
  constructor() {
    super('lpingDelete', {
      name: 'lping delete',
      prefixId: 'lpingDelete',
      category: 'ping',
      channel: 'guild',
      userPermissions: [PermissionsBitField.Flags.ManageMessages],
      commandType: 'sub',
      parentCommand: 'lping',
      shortName: 'delete',
      slashOptions: [
        {
          name: 'pinglist',
          description: 'The pinglist to delete',
          type: ApplicationCommandOptionType.String,
          required: true,
          max_length: 40,
        },
      ],
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const pinglist = interaction.options.getString('pinglist', true)
      .replace(/\s/g, '')
      .toLowerCase();

    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`I couldn't find a pinglist with the name ${pinglist}. You can view available pinglists in this server by using the ${getCommandMention(this.client, 'lping list')} command.`);

    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setDescription(`Successfully deleted the **${pinglist}** pinglist.`);

    db.query('SELECT * FROM pinglist WHERE `name` = ? AND `guildID` = ?', [pinglist, interaction.guild.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
      db.query('DELETE FROM pinglist WHERE name = ? AND guildID = ?', [pinglist, interaction.guild.id]);
      return interaction.editReply({ embeds: [embed] });
    });
  }
};
