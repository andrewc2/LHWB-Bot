const { SlashCommand } = require("discord-akairo");
const { Constants, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { db } = require("../../models/db");
const { isTrusted } = require("../../utilities/permissions");

class LPingPingCommand extends SlashCommand {
    constructor() {
        super('lpingping', {
            name: 'lping ping',
            category: "ping",
            channel: "guild",
            commandType: "sub",
            parentCommandName: "lping",
            shortCommandName: "ping",
            args: [
                {
                    name: "pinglist",
                    description: "The name of the pinglist to ping",
                    type: Constants.ApplicationCommandOptionTypes.STRING,
                    required: true,
                    autocomplete: true,
                }
            ]
        });
    }

    async exec(interaction) {
        await interaction.deferReply({ fetchReply: true });
        const pinglist = interaction.options.getString("pinglist", true).toLowerCase();

        const failedEmbed = new MessageEmbed()
            .setColor("RED");

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("send")
                    .setLabel("PING MANY PEOPLE")
                    .setStyle("DANGER"),
                new MessageButton()
                    .setCustomId("cancel")
                    .setLabel("CANCEL PING")
                    .setStyle("SECONDARY"),
            );

        async function findPingList() {
            const [result] = await db.promise().query("SELECT `name`, `guildID` FROM Ping WHERE name = ? AND guildID = ?", [pinglist, interaction.guild.id]);
            return result.length !== 0;
        }

        function ping() {
            db.query("SELECT u.userID FROM User as u INNER JOIN UserPing as up ON u.userID = up.userID INNER JOIN Ping as p ON p.pingID = up.pingID WHERE p.guildID = ? AND p.name = ?", [interaction.guild.id, pinglist], async function(err, result) {
                if (err) return;
                if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed.setDescription("It looks like nobody has this pinglist assigned. :confused:")], components: [] });
                const users = [`${pinglist}`];
                for (const rows of result.values()) {
                    await interaction.guild.members.fetch({ user: rows.userID })
                        .then(user => {
                            users.push(user.user.toString());
                        })
                        .catch(() => console.error());
                }
                users.push("- to join this pinglist, do \`/lping get\` in bots.");
                if (users.length < 3) return interaction.editReply({ embeds: [failedEmbed.setDescription("It looks like nobody has this pinglist assigned. :confused:")], components: [] });
                await interaction.deleteReply();
                const sendList = users.join(" ").toString();
                for (let i = 0; i < sendList.length; i += 1999) {
                    const toSend = sendList.substring(i, Math.min(sendList.length, i + 1999));
                    await interaction.followUp(toSend);
                }
            });
        }

        if (await findPingList() === true) {
            if (await isTrusted(interaction.member)) {
                const permsEmbed = new MessageEmbed()
                    .setDescription("Sorry, you don't have the correct permissions to ping a pinglist.")
                    .setColor("RED");
                return interaction.editReply({ embeds: [permsEmbed] });
            }
            const buttonEmbed = new MessageEmbed()
                .setTitle(`Ping ${pinglist}?`)
                .setDescription(`${interaction.user}, This command **WILL SEND a potential mass ping.** Are you sure you want to **PING** this ping list? This is **NOT** how you GET the list.\n${this.client.user.username} is not responsible for any potential consequences.`)
                .setColor("YELLOW")
                .setFooter({ text: "To GET this pinglist, do /lping get in bots." });

            interaction.editReply({ embeds: [buttonEmbed], components: [row] })
                .then(message => {
                    const filter = async i => {
                        await i.deferUpdate();
                        return i.user.id === interaction.user.id;
                    };
                    message.awaitMessageComponent({ filter, componentType: "BUTTON", time: 10000 })
                        .then(i => {
                            if (i.customId === "send") {
                                ping();
                            } else {
                                i.deleteReply();
                            }
                        })
                        .catch(() => interaction.editReply({ components: [] }));
                });
        }
        else {
            return interaction.editReply({ embeds: [failedEmbed.setDescription("Uh oh! Looks like this pinglist does not exist.\nYou can can view available pinglists in this server by doing `/lping list`")] });
        }
    }

    async autocomplete(interaction) {
        if (!interaction.guild) return interaction.respond([]);
        const input = interaction.options.getString('pinglist', true).toLowerCase();

        const sql = input.length > 0
            ? 'SELECT `name`, `guildID` FROM `Ping` WHERE `guildID` = ? AND `name` LIKE ? LIMIT 10'
            : 'SELECT `name`, `guildID` FROM `Ping` WHERE `guildID` = ? ORDER BY `name` LIMIT 10';

        const values = input.length > 0 ? [interaction.guild.id, `${input}%`] : [interaction.guild.id];
        const [row] = await db.promise().query(sql, values);

        const result = row.map((x) => ({
            name: x.name,
            value: x.name,
        }));

        await interaction.respond(result);
    }
}

module.exports = LPingPingCommand;
