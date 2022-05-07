const { SlashCommand } = require("discord-akairo");
const { Constants, MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { autocomplete } = require("../../slashCommandUtilities/lpingutilities");

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
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png" }), url: interaction.user.displayAvatarURL({ dynamic: true, format: "png" }) })
            .setColor("#FF69B4");

        async function findPingList() {
            const [result] = await db.promise().query("SELECT `name`, `guildID` FROM Ping WHERE name = ? AND guildID = ?", [pinglist, interaction.guild.id]);
            return result.length !== 0;
        }

        if (await findPingList() === true) {
            db.query("SELECT u.userID FROM User as u INNER JOIN UserPing as up ON u.userID = up.userID INNER JOIN Ping as p ON p.pingID = up.pingID WHERE p.guildID = ? AND p.name = ?", [interaction.guild.id, pinglist], async function(err, result) {
                if (err) return;
                if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed.setDescription("It looks like nobody has this pinglist assigned. :confused:")] });
                const users = [`${pinglist}`];
                for (const rows of result.values()) {
                    await interaction.guild.members.fetch({ user: rows.userID })
                        .then(user => {
                            users.push(user.user.toString());
                        })
                        .catch(() => console.error());
                }
                users.push("- to join this pinglist, do \`/lping get\` in bots.");
                if (users.length < 3) return interaction.editReply({ embeds: [failedEmbed.setDescription("It looks like nobody has this pinglist assigned. :confused:")] });
                const sendList = users.join(" ").toString();
                for (let i = 0; i < sendList.length; i += 1999) {
                    const toSend = sendList.substring(i, Math.min(sendList.length, i + 1999));
                    await interaction.followUp({ embeds: [
                        embed
                            .addField('Total Pinglist Members Result:', result.length.toString())
                            .setDescription(toSend)
                    ]});
                }
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
