const { SlashCommand } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class LPingJoinedCommand extends SlashCommand {
    constructor() {
        super("pingjoined", {
            name: "lping joined",
            prefixId: "lping",
            category: "ping",
            channel: "guild",
            commandType: "sub",
            parentCommandName: "lping",
            shortCommandName: "joined",
        });
    }

    async exec(interaction) {
        await interaction.deferReply();
        const failedEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("Uh oh! Looks like you've not joined any pinglists.\nYou can can view available pinglists in this server by doing `/lping list`");

        const embed = new MessageEmbed()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png" }), url: interaction.user.displayAvatarURL({ dynamic: true, format: "png" }) })
            .setColor("#FF69B4")
            .setTitle("Assigned Pings");

        db.query("SELECT u.userID, p.pingID, p.name FROM User as u INNER JOIN UserPing as up ON u.userID = up.userID INNER JOIN Ping as p ON p.pingID = up.pingID WHERE p.guildID = ? AND up.userID = ?", [interaction.guild.id, interaction.user.id], function(err, result) {
            if (err) return;
            if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
            const pings = result.map(i => i.name);
            return interaction.editReply({ embeds: [embed.setDescription(`\`${pings.join("` | `")}\``)] });
        });


    }
}

module.exports = LPingJoinedCommand;
