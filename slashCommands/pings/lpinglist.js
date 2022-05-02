const { SlashCommand } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class LPingListCommand extends SlashCommand {
    constructor() {
        super("lpinglist", {
            name: "lping list",
            prefixId: "lpinglist",
            category: "ping",
            channel: "guild",
            commandType: "sub",
            parentCommandName: "lping",
            shortCommandName: "list",
        });
    }

    async exec(interaction) {
        await interaction.deferReply();

        const failedEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("Uh oh! Looks like this pinglist does not exist.\nYou can can view available pinglists in this server by doing `/lping list`");

        const embed = new MessageEmbed()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png" }), url: interaction.user.displayAvatarURL({ dynamic: true, format: "png" }) })
            .setColor("#FF69B4")
            .setTitle("Server Pinglists");

        db.query("SELECT `name` FROM Ping WHERE guildID = ?", [interaction.guild.id], function(err, result) {
            if (err) return;
            if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
            const pings = result.map(x => x.name);
            return interaction.editReply({ embeds: [embed.setDescription(`Here are the pinglists available in this server. Use \`/lping get\` to join one.\n\n \`${pings.join("` | `")}\``)] });
        });
    }
}

module.exports = LPingListCommand;
