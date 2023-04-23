const { SlashCommand } = require('discord-akairo');
const {
  ApplicationCommandOptionType,
  EmbedBuilder,
  Colors,
  ComponentType,
} = require('discord.js');
const { db } = require('../../models/db');
const { isTrusted } = require('../../utilities/permissions');
const {
  autocomplete,
  checkPinglistExists,
  pingPinglistButton,
  joinPinglistButton,
  NO_MEMBERS,
  PINGLIST_NOT_FOUND,
} = require('../../commandUtilities/lpingUtilities');
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

    const MAX_CHARACTER_LENGTH = 1930;

    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    const generatingPinglistEmbed = new EmbedBuilder()
      .setDescription(`${interaction.user.tag} (${interaction.user}) has requested the **${pinglist}** pinglist. Please wait while the pinglist generates...`)
      .setColor(Colors.Blurple);

    const doesPinglistExist = await checkPinglistExists(pinglist, interaction);

    const handlePing = async () => {
      await interaction.editReply({ embeds: [generatingPinglistEmbed], components: [] });
      const [result] = await db.promise().query('SELECT u.userID FROM user as u INNER JOIN userPinglist as up ON u.userID = up.userID INNER JOIN pinglist as p ON p.pingID = up.pingID WHERE p.guildID = ? AND p.name = ?', [interaction.guild.id, pinglist]);
      if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed.setDescription(NO_MEMBERS)], components: [] });

      // Because <guild>.members.fetch() has a limit of 100 users at a time, a weird workaround will have to be used
      const mentions = [];
      const resultChunk = result.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 99);
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
      }, []);
      for (let i = 0; i < resultChunk.length; i++) {
        const users = resultChunk[i].map(user => user.userID);
        await interaction.guild.members.fetch({ user: users })
          .then((user) => mentions.push(...user.map(u => u.user.toString())))
          .catch((err) => logger.log('warn', err));
      }


      if (mentions.size < 1) return interaction.editReply({ embeds: [failedEmbed.setDescription(NO_MEMBERS)], components: [] });
      await interaction.editReply({ embeds: [generatingPinglistEmbed.setDescription(`${interaction.user.tag} (${interaction.user}) has requested the **${pinglist}** pinglist.`)], components: [] });
      const sendList = [];
      const chunksRequired = Math.ceil(mentions.toString().length / MAX_CHARACTER_LENGTH);
      for (let i = chunksRequired; i > 0; i--) {
        sendList.push(mentions.splice(0, Math.ceil(mentions.length / i)));
      }
      sendList.forEach((list, i) => {
        if (list.length < 1) return;
        const content = `${pingMessage !== null ? `${pinglist}: ${pingMessage.toLowerCase()}` : pinglist} ${list.join('').trim()}`;
        const payload = i === 0 ? { content: content, components: [joinPinglistButton(pinglist)] } : { content: content };
        interaction.followUp(payload);
      });
    };

    if (!doesPinglistExist) {
      return interaction.editReply({ embeds: [failedEmbed.setDescription(PINGLIST_NOT_FOUND(pinglist, this.client))] });
    }

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

    interaction.editReply({ embeds: [buttonEmbed], components: [pingPinglistButton] })
      .then(message => {
        const filter = async i => {
          await i.deferUpdate();
          return i.user.id === interaction.user.id;
        };
        message.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 10000 })
          .then(async i => {
            if (i.customId === 'send') {
              await handlePing();
            }
            else {
              i.deleteReply();
            }
          })
          .catch(() => interaction.deleteReply());
      });
  }

  async autocomplete(interaction) {
    await autocomplete(interaction);
  }
};
