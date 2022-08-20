const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const { findLastFmUser } = require('../../commandUtilities/lastFmUtilities');
const { db } = require('../../models/db');

module.exports = class LastFmSetSlashCommand extends SlashCommand {
  constructor() {
    super('lastFmSet', {
      name: 'lastfm set',
      prefixId: 'lastFm',
      category: 'lastfm',
      commandType: 'sub',
      parentCommand: 'lastfm',
      shortName: 'set',
      slashOptions: [
        {
          name: 'username',
          description: 'The last.fm username you\'d like to set',
          type: ApplicationCommandOptionType.String,
          required: true,
          min_length: 2,
          max_length: 15,
        },
      ],
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const embed = new EmbedBuilder();
    const username = interaction.options.getString('username', true);

    const invalidUsername = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(
        'The username you have provided is invalid. For more information, visit https://www.last.fm/join.',
      );

    const addLastFm = async () => {
      const lastFmUsername = await findLastFmUser(interaction.user);
      if (lastFmUsername) {
        db.query('UPDATE `lastfm` SET `lastfmUsername` = ? WHERE `discordID` = ?', [username, interaction.user.id]);
        embed
          .setDescription(`Your last.fm username has been updated to ${username}`)
          .setColor('#FF69B4');
        return interaction.editReply({ embeds: [embed] });
      }
      else {
        db.query('INSERT INTO lastfm (lastfmUsername, discordTag, discordID) VALUES (?,?,?) ', [username, interaction.user.tag, interaction.user.id]);
        embed
          .setColor('#FF69B4')
          .setDescription(`Your last.fm username has been set to ${username}.`);
        return interaction.editReply({ embeds: [embed] });
      }
    };

    if (
      !/^[a-zA-Z0-9_-]+$/.test(username) ||
			!/^[a-zA-Z]+$/.test(username.charAt(0))
    ) {
      return interaction.editReply({ embeds: [invalidUsername] });
    }
    else {
      await addLastFm();
    }
  }
};
