import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, EmbedBuilder, Colors } from 'discord.js';
import { database } from '../../models/database.js';
import { autocomplete, joinPinglistButton } from '../../commandUtilities/lpingUtilities.js';
import Utilities from '../../utilities/Utilities.js';
import Logger from '../../utilities/Logger.js';

export default class LpingShow extends Command {
  constructor() {
    super('lpingShow', {
      name: 'lping show',
      category: 'ping',
      options: [
        {
          name: 'pinglist',
          description: 'The name of the pinglist to show',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
          max_length: 40,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'lping',
        shortName: 'show',
      },
    });
  }

  async exec(interaction) {
    const client = this.client;
    await interaction.deferReply();
    const pinglist = interaction.options.getString('pinglist', true)
      .replace(/\s/g, '')
      .toLowerCase();

    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`I couldn't find a pinglist with the name ${pinglist}. You can view available pinglists in this server by using the ${Utilities.getCommandMention(this.client, 'lping list')} command.`);

    const embed = new EmbedBuilder()
      .setColor('#FF69B4');

    async function findPingList() {
      const [result] = await database.promise().query('SELECT `name`, `guildID` FROM pinglist WHERE name = ? AND guildID = ?', [pinglist, interaction.guild.id]);
      return result.length !== 0;
    }

    if (await findPingList() === true) {
      database.query('SELECT u.userID FROM user as u INNER JOIN userPinglist as up ON u.userID = up.userID INNER JOIN pinglist as p ON p.pingID = up.pingID WHERE p.guildID = ? AND p.name = ?', [interaction.guild.id, pinglist], async function(err, result) {
        if (err) return;
        const userIds = result.map(user => user.userID);
        await interaction.guild.members.fetch({ user: userIds })
          .then(async users => {
            if (users.size < 1) return interaction.editReply({ embeds: [failedEmbed.setDescription('It looks like nobody has this pinglist assigned. :confused:')], components: [joinPinglistButton(pinglist)] });
            const mentions = users.map(user => user.user.toString());
            const mentionsAgain = mentions;
            while (mentionsAgain.join(' ').length > 1999) {
              mentionsAgain.pop();
            }
            const toSend = mentions.join(' ').length > 1999 ? mentionsAgain.join(' ') + '...' : mentionsAgain.join(' ');
            return interaction.editReply({ embeds: [
              embed
                .setTitle(`${pinglist.charAt(0).toUpperCase() + pinglist.slice(1)} Pinglist`)
                .setDescription(`${toSend} - to join this pinglist, use the ${Utilities.getCommandMention(client, 'lping get')} command in a spam channel.`)
                .addFields([{ name: 'Total Pinglist Members Result:', value: users.size.toString(), inline: false }]),
            ], components: [joinPinglistButton(pinglist)] });
          })
          .catch(err => {
            Logger.warn(err);
            return interaction.editReply({ embeds: [failedEmbed.setDescription('Sorry, something went wrong when fetching this pinglist.')] });
          });
      });
    }
    else {
      return interaction.editReply({ embeds: [failedEmbed] });
    }
  }

  async autocomplete(interaction) {
    await autocomplete(interaction);
  }
}
