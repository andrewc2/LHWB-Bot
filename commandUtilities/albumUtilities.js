const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const originalAlbumButton = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId('tvAlbum')
      .setLabel('Taylor\'s Version')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('ogAlbum')
      .setLabel('Original Album')
      .setStyle(ButtonStyle.Secondary),
  );

module.exports = {
  originalAlbumButton,
};
