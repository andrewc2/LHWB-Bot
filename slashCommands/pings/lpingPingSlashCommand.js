const { SlashCommand } = require('discord-akairo');
const {
  ApplicationCommandOptionType,
  EmbedBuilder,
  Colors,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require('discord.js');
const { db } = require('../../models/db');
const { isTrusted } = require('../../utilities/permissions');
const { autocomplete } = require('../../commandUtilities/lpingUtilities');
const { logger } = require('../../utilities/winstonLogging');

module.exports = class LpingPingSlashCommand extends SlashCommand {
  constructor() {
    super('lpingPing', {
      name: 'lping ping',
      prefixId: 'lping',
      category: 'ping',
      channel: 'guild',
      commandType: 'sub',
      parentCommand: 'lping',
      shortName: 'ping',
      slashOptions: [
        {
          name: 'pinglist',
          description: 'The name of the pinglist to ping',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
          max_length: 40,
        },
        {
          name: 'message',
          description: 'The message to send along with the ping',
          type: ApplicationCommandOptionType.String,
          required: false,
          max_length: 60,
        },
      ],
    });
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true });
    const pinglist = interaction.options.getString('pinglist', true)
      .replace(/\s/g, '')
      .toLowerCase();
    const pingMessage = interaction.options.getString('message');

    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    const pleaseWaitEmbed = new EmbedBuilder()
      .setDescription(`${interaction.user.tag} (${interaction.user}) has requested the **${pinglist}** pinglist. Please wait while the pinglist generates...`)
      .setColor(Colors.Blurple);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('send')
          .setLabel('PING MANY PEOPLE')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('cancel')
          .setLabel('CANCEL PING')
          .setStyle(ButtonStyle.Secondary),
      );

    const joinPinglist = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(JSON.stringify({ type: 'ping', id: pinglist }))
          .setLabel('Join Pinglist')
          .setEmoji('🔔')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(JSON.stringify({ type: 'drop', id: pinglist }))
          .setLabel('Leave Pinglist')
          .setEmoji('🚮')
          .setStyle(ButtonStyle.Secondary),
      );

    async function findPingList() {
      const [result] = await db.promise().query('SELECT `name`, `guildID` FROM pinglist WHERE name = ? AND guildID = ?', [pinglist, interaction.guild.id]);
      return result.length !== 0;
    }

    async function ping() {
      await interaction.editReply({ embeds: [pleaseWaitEmbed] });
      db.query('SELECT u.userID FROM user as u INNER JOIN userPinglist as up ON u.userID = up.userID INNER JOIN pinglist as p ON p.pingID = up.pingID WHERE p.guildID = ? AND p.name = ?', [interaction.guild.id, pinglist], async function(err, result) {
        if (err) return;
        if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed.setDescription('It looks like nobody has this pinglist assigned. :confused:')], components: [] });
        const userIds = result.map(user => user.userID);
        await interaction.guild.members.fetch({ user: userIds })
          .then(async users => {
            if (users.size < 1) return interaction.editReply({ embeds: [failedEmbed.setDescription('It looks like nobody has this pinglist assigned. :confused:')], components: [] });
            const mentions = users.map(user => user.user.toString());
            const sendList = `${pingMessage !== null ? `${pinglist}: ${pingMessage.toLowerCase()}` : pinglist} ${mentions.join(' ').trim()}`;
            await interaction.editReply({ embeds: [ pleaseWaitEmbed.setDescription(`${interaction.user.tag} (${interaction.user}) has requested the **${pinglist}** pinglist.`) ], components: [] });
            for (let i = 0; i < sendList.length; i += 1999) {
              const toSend = sendList.substring(i, Math.min(sendList.length, i + 1999));
              const payload = i === 0 ? { content: toSend, components: [joinPinglist] } : { content: toSend };
              await interaction.followUp(payload);
            }
          })
          .catch(err => {
            logger.log('error', err);
            interaction.editReply({ embeds: [failedEmbed.setDescription('Sorry, something went wrong while generating this pinglist.')], components: [] });
          });
      });
    }

    if (await findPingList() === true) {
      if (await isTrusted(interaction.member)) {
        const permsEmbed = new EmbedBuilder()
          .setDescription('Sorry, you don\'t have the correct permissions to ping a pinglist.')
          .setColor(Colors.Red);
        return interaction.editReply({ embeds: [permsEmbed] });
      }
      const buttonEmbed = new EmbedBuilder()
        .setTitle(`Ping ${pinglist}?`)
        .setDescription(`${interaction.user}, This command **WILL SEND a potential mass ping.** Are you sure you want to **PING** this ping list? This is **NOT** how you GET the list.\n${this.client.user.username} is not responsible for any potential consequences.`)
        .setColor(Colors.Yellow);

      interaction.editReply({ embeds: [buttonEmbed], components: [row] })
        .then(message => {
          const filter = async i => {
            await i.deferUpdate();
            return i.user.id === interaction.user.id;
          };
          message.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 10000 })
            .then(async i => {
              if (i.customId === 'send') {
                await ping();
              }
              else {
                i.deleteReply();
              }
            })
            .catch(() => interaction.deleteReply());
        });
    }
    else {
      return interaction.editReply({ embeds: [failedEmbed.setDescription(`I couldn't find a pinglist with the name ${pinglist}. You can view available pinglists in this server by using the \`/lping list\` command.`)] });
    }
  }

  async autocomplete(interaction) {
    await autocomplete(interaction);
  }
};
