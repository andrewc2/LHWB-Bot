const { SlashCommand } = require("discord-akairo");
const { Constants, MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { autocomplete } = require("../../slashCommandUtilities/lpingutilities");
const {logger} = require("../../utilities/logging");

class LPingShowCommand extends SlashCommand {
    constructor() {
        super("lpingshow", {
            name: "lping show",
            prefixId: "lpingshow",
            category: "ping",
            channel: "guild",
            commandType: "sub",
            parentCommandName: "lping",
            shortCommandName: "show",
            args: [
                {
                    name: "pinglist",
                    description: "The name of the pinglist to show",
                    type: Constants.ApplicationCommandOptionTypes.STRING,
                    required: true,
                    autocomplete: true,
                }
            ]
        });
    }

    async exec(interaction) {
        await interaction.deferReply();
        const pinglist = interaction.options.getString("pinglist", true).toLowerCase();

        const failedEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("Uh oh! Looks like this pinglist does not exist.\nYou can view available pinglists in this server by doing `/lping list`");

        const embed = new MessageEmbed()
            .setColor("#FF69B4");

        async function findPingList() {
            const [result] = await db.promise().query("SELECT `name`, `guildID` FROM Ping WHERE name = ? AND guildID = ?", [pinglist, interaction.guild.id]);
            return result.length !== 0;
        }

        if (await findPingList() === true) {
            db.query("SELECT u.userID FROM User as u INNER JOIN UserPing as up ON u.userID = up.userID INNER JOIN Ping as p ON p.pingID = up.pingID WHERE p.guildID = ? AND p.name = ?", [interaction.guild.id, pinglist], async function(err, result) {
                if (err) return;
                const userIds = result.map(user => user.userID)
                await interaction.guild.members.fetch({ user: userIds })
                    .then(async users => {
                        if (users.size < 1) return interaction.editReply({ embeds: [failedEmbed.setDescription("It looks like nobody has this pinglist assigned. :confused:")] });
                        const mentions = users.map(user => user.user.toString());
                        const mentionsAgain = mentions;
                        while (mentionsAgain.join(" ").length > 1999) {
                            mentionsAgain.pop()
                        }
                        const toSend = mentions.join(" ").length > 1999 ? mentionsAgain.join(" ") + "..." : mentionsAgain.join(" ");
                        return interaction.editReply({ embeds: [
                            embed
                                .setTitle(`${pinglist.charAt(0).toUpperCase() + pinglist.slice(1)} Pinglist`)
                                .setDescription(`${toSend} - to join this pinglist, do \`/lping get ${pinglist}\` in bots.`)
                                .addFields({ name: 'Total Pinglist Members Result:', value: users.size.toString(), inline: false })
                        ]});
                    })
                    .catch(err => {
                        logger.log('error', err);
                        return interaction.editReply({ embeds: [failedEmbed.setDescription("Sorry, something went wrong when fetching this pinglist.")] });
                    });
            });
        }
        else {
            return interaction.editReply({ embeds: [failedEmbed.setDescription("Uh oh! Looks like this pinglist does not exist.\nYou can view available pinglists in this server by doing `/lping list`")] });
        }
    }

    async autocomplete(interaction) {
        await autocomplete(interaction);
    }
}

module.exports = LPingShowCommand;
