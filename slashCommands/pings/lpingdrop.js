const { SlashCommand } = require("discord-akairo");
const { Constants, MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { autocomplete } = require("../../slashCommandUtilities/lpingutilities");

class LPingDropCommand extends SlashCommand {
    constructor() {
        super('lpingdrop', {
            name: 'lping drop',
            prefixId: "lpingdrop",
            category: "ping",
            channel: "guild",
            commandType: "sub",
            parentCommandName: "lping",
            shortCommandName: "drop",
            args: [
                {
                    name: "pinglist",
                    description: "The name of the pinglist to drop",
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

        db.query("SELECT `name`, `guildID` FROM Ping WHERE name = ? AND guildID = ?", [pinglist, interaction.guild.id], function(err, result) {
            if (err) return;
            if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
            db.query("SELECT u.userID, p.pingID, p.name FROM User as u INNER JOIN UserPing as up ON u.userID = up.userID INNER JOIN Ping as p ON p.pingID = up.pingID WHERE p.guildID = ? AND up.userID = ? AND p.name = ?", [interaction.guild.id, interaction.user.id, pinglist], function(err, result) {
                if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed.setDescription(`You are not apart of the ${pinglist} pinglist in this server.`)] });
                db.query("DELETE UserPing FROM UserPing INNER JOIN User as u On UserPing.userID = u.userID INNER JOIN Ping as p on UserPing.pingID = p.pingID WHERE p.guildID = ? AND u.userID = ? AND p.name = ?", [interaction.guild.id, interaction.user.id, pinglist]);
                return interaction.editReply({ embeds: [embed.setDescription(`You have been successfully removed from the ${pinglist} pinglist.`)] });
            });
        });
    }

    async autocomplete(interaction) {
        await autocomplete(interaction);
    }
}

module.exports = LPingDropCommand;
