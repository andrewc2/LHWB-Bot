const { SlashCommand } = require("discord-akairo");
const { Constants, MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class LPingGetCommand extends SlashCommand {
    constructor() {
        super('lpingget', {
            name: 'lping get',
            category: "ping",
            channel: "guild",
            commandType: "sub",
            parentCommandName: "lping",
            shortCommandName: "get",
            args: [
                {
                    name: "pinglist",
                    description: "The name of the pinglist to join",
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
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png" }), url: interaction.user.displayAvatarURL({ dynamic: true, format: "png" }) })
            .setColor("#FF69B4");

        db.query("SELECT `name`, `guildID` FROM Ping WHERE name = ? AND guildID = ?", [pinglist, interaction.guild.id], function(err, result) {
            if (err) return;
            if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
            db.query("SELECT u.userID, p.pingID, p.name FROM User as u INNER JOIN UserPing as up ON u.userID = up.userID INNER JOIN Ping as p ON p.pingID = up.pingID WHERE p.guildID = ? AND up.userID = ? AND p.name = ?", [interaction.guild.id, interaction.user.id, pinglist], function(err, result) {
                if (result.length > 0) return interaction.editReply({ embeds: [failedEmbed.setDescription(`You are already apart of the ${result[0].name} pinglist in this server.`)] });
                db.query("INSERT INTO UserPing (userID, pingID) SELECT u.userID, p.pingID FROM User as u, Ping as p WHERE u.userID = ? AND p.name = ? AND p.guildID = ?", [interaction.user.id, pinglist, interaction.guild.id]);
                return interaction.editReply({ embeds: [embed.setDescription(`You have been successfully added to the ${pinglist} pinglist.`)] });
            });
        });
    }
}

module.exports = LPingGetCommand;
