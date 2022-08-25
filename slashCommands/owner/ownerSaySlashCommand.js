const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');

module.exports = class OwnerSaySlashCommand extends SlashCommand {
  constructor() {
    super('ownerSay', {
      name: 'owner say',
      parentCommand: 'owner',
      shortName: 'say',
      ownerOnly: true,
      category: 'owner',
      prefixId: 'lsay',
      commandType: 'sub',
      slashOptions: [
        {
          name: 'channel-id',
          description: 'The channel id to send the message to',
          type: ApplicationCommandOptionType.String,
          required: true,
          max_length: 20,
        },
        {
          name: 'text',
          description: 'The message to send',
          type: ApplicationCommandOptionType.String,
          required: true,
          max_length: 1000,
        },
      ],
    });
  }

  exec(interaction) {
    const embed = new EmbedBuilder()
      .setDescription('Message sent')
      .setColor(Colors.Green);

    const failEmbed = new EmbedBuilder()
      .setDescription('Something went wrong')
      .setColor(Colors.Red);

    const channelId = interaction.options.getString('channel-id', true);
    const text = interaction.options.getString('text', true);
    this.client.channels.cache.get(channelId).send(text)
      .then(() => interaction.reply({ embeds: [embed], ephemeral: true }))
      .catch(() => interaction.reply({ embeds: [failEmbed], ephemeral: true }));
  }
};
