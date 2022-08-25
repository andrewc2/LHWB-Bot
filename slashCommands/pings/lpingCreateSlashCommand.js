const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors, PermissionsBitField } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class LpingCreateSlashCommand extends SlashCommand {
  constructor() {
    super('lpingCreate', {
      name: 'lping create',
      prefixId: 'lpingCreate',
      category: 'ping',
      channel: 'guild',
      userPermissions: [PermissionsBitField.Flags.ManageMessages],
      commandType: 'sub',
      parentCommand: 'lping',
      shortName: 'create',
      slashOptions: [
        {
          name: 'pinglist',
          description: 'The name of the pinglist to be created',
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
      .setDescription('Uh oh! Looks like this pinglist already exists with this name. You can view available pinglists in this server by using the `/lping list` command.');

    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setDescription(`Successfully created the **${pinglist}** pinglist.`);

    db.query('SELECT * FROM pinglist WHERE `name` = ? AND `guildID` = ?', [pinglist, interaction.guild.id], function(err, result) {
      if (err) return;
      if (result.find(ping => ping.name === pinglist)) return interaction.editReply({ embeds: [failedEmbed] });
      db.query('INSERT INTO pinglist (`name`, `guildID`) VALUES (?,?)', [pinglist, interaction.guild.id]);
      return interaction.editReply({ embeds: [embed] });
    });
  }
};
