const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { anyUsage } = require("../../utilities");

class LPingListCommand extends Command {
    constructor() {
        super("lpinglist", {
            aliases: ["lping list"],
            category: "ping",
            channel: "guild",
            description: {
                content: "View the available pinglists in a server.",
                usage: "lping list",
                examples: [
                    "lping list"
                ]
            }
        });
    }

    exec(message) {
        const failedEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Uh oh! Looks like there are no ping lists in this server.\nYou can create one by typing ${anyUsage(message.guild, message.client, 'lping create [name]')}`);

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: "png"}), message.author.displayAvatarURL({dynamic: true, format: "png"}))
            .setColor('#FF69B4')
            .setTitle('Server Pinglists')

        db.query("SELECT `name` FROM Ping WHERE guildID = ?", [message.guild.id], function (err, result) {
            if (err) return;
            if (result.length < 1) return message.channel.send(failedEmbed)
            let pings = []
            for (const rows of result.values()) {
                pings.push(rows.name)
            }
            return message.channel.send(embed.setDescription(`Here are the pinglists available in this server. Use ${anyUsage(message.guild, message.client, 'lping get [name]')} to get one.\n\n \`${pings.join('` | `')}\``))
        })
    }
}

module.exports = LPingListCommand;