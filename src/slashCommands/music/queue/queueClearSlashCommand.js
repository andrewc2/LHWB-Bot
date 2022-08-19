const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, Colors } = require('discord.js');
const { db } = require('../../../models/db');
const { SEARCH_QUEUE, CLEAR_QUEUE } = require('../../../models/musicQueries');
const { cmdRestrictions } = require('../../../utilities/permissions');

module.exports = class QueueClearSlashCommand extends SlashCommand {
  constructor() {
    super('queueClear', {
      name: 'queue clear',
      prefixId: 'clearQueue',
      category: 'music',
      channel: 'guild',
      commandType: 'sub',
      parentCommand: 'queue',
      shortName: 'clear',
    });
  }

  async userPermissions(message) {
    return await cmdRestrictions(message);
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true });
    const embed = new EmbedBuilder().setColor(Colors.Green);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('clear')
          .setLabel('Clear')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('cancel')
          .setLabel('Cancel')
          .setStyle(ButtonStyle.Secondary),
      );

    db.query(SEARCH_QUEUE, [interaction.guild.id], function(err, result) {
      if (result.length > 0) {
        const buttonEmbed = new EmbedBuilder()
          .setDescription(`${interaction.user}, Are you sure you want to clear the queue?`)
          .setColor(Colors.Yellow);
        interaction.editReply({ embeds: [buttonEmbed], components: [row] })
          .then(message => {
            const filter = async i => {
              await i.deferUpdate();
              return i.user.id === interaction.user.id;
            };
            message.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 10000 })
              .then(i => {
                if (i.customId === 'clear') {
                  db.query(CLEAR_QUEUE, [interaction.user.id]);
                  i.editReply({ embeds: [embed.setDescription('The queue has been cleared 🧹')], components: [] });
                }
                else {
                  i.deleteReply();
                }
              })
              .catch(() => interaction.editReply({ components: [] }));
          });
      }
      else {
        return interaction.editReply({ embeds: [
          embed
            .setDescription('The queue is already empty.')
            .setColor(Colors.Red),
        ] });
      }
    });
  }
};
