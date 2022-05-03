const { SlashCommand } = require("discord-akairo");
const { Constants, MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class LPingCreateCommand extends SlashCommand {
    constructor() {
        super('lpingcreate', {
            name: 'lping create',
            prefixId: "lpingcreate",
            category: "ping",
            channel: "guild",
            userPermissions: ["MANAGE_MESSAGES"],
            commandType: "sub",
            parentCommandName: "lping",
            shortCommandName: "create",
            args: [
                {
                    name: "pinglist",
                    description: "The name of the pinglist to delete",
                    type: Constants.ApplicationCommandOptionTypes.STRING,
                    required: true,
                }
            ]
        });
    }

    async exec(interaction) {
        await interaction.deferReply();
        const pinglist = interaction.options.getString("pinglist", true);

        const failedEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("Uh oh! Looks like this pinglist already exists.\nYou can view available pinglists in this server by doing `/lping list`");

        const embed = new MessageEmbed()
            .setColor("#FF69B4")
            .setDescription("Successfully created the pinglist.");

        db.query("SELECT * FROM `Ping` WHERE `name` = ? AND `guildID` = ?", [pinglist, interaction.guild.id], function(err, result) {
            if (err) return;
            if (result.find(ping => ping.name === pinglist)) return interaction.editReply({ embeds: [failedEmbed] });
            db.query("INSERT INTO `Ping` (`name`, `guildID`) VALUES (?,?)", [pinglist, interaction.guild.id]);
            return interaction.editReply({ embeds: [embed] });
        });
    }
}

module.exports = LPingCreateCommand;
