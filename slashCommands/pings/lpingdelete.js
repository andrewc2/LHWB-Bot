const { SlashCommand } = require("discord-akairo");
const { Constants, MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class LPingDeleteCommand extends SlashCommand {
    constructor() {
        super("lpingdelete", {
            name: "lping delete",
            prefixId: "lpingdelete",
            category: "ping",
            channel: "guild",
            userPermissions: ["MANAGE_MESSAGES"],
            commandType: "sub",
            parentCommandName: "lping",
            shortCommandName: "delete",
            args: [
                {
                    name: "pinglist",
                    description: "The pinglist to delete",
                    type: Constants.ApplicationCommandOptionTypes.STRING,
                    required: true,
                }
            ]
        });
    }

    async exec(interaction) {
        await interaction.deferReply();
        const pinglist = interaction.options.getString("pinglist", true).toLowerCase();

        const failedEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("Uh oh! Looks like this pinglist does not exist.\nYou can can view available pinglists in this server by doing `/lping list`");

        const embed = new MessageEmbed()
            .setColor("#FF69B4")
            .setDescription("Successfully deleted the pinglist.");

        db.query("SELECT * FROM `Ping` WHERE `name` = ? AND `guildID` = ?", [pinglist, interaction.guild.id], function(err, result) {
            if (err) return;
            if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
            db.query("DELETE FROM `Ping` WHERE name = ? AND guildID = ?", [pinglist, interaction.guild.id]);
            return interaction.editReply({ embeds: [embed] });
        });
    }
}

module.exports = LPingDeleteCommand;
