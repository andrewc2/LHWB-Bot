const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { commandUsage, anyUsage } = require("../../utilities");

class LPingDropCommand extends Command {
    constructor() {
        super("lpingdrop", {
            aliases: ["lping drop"],
            category: "ping",
            channel: "guild",
            description: {
                content: "Removes a user from the specified pinglist.",
                usage: "lping drop [name]",
                examples: [
                    "lping drop chase"
                ]
            },
            args: [
                {
                    id: 'name',
                    type: 'lowercase',
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage)
                }
            ]
        });
    }

    exec(message, args) {
        const failedEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Uh oh! Looks like this pinglists does not exist.\nYou can can view available pinglists in this server by doing ${anyUsage(message.guild, message.client, 'lping list')}`);

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: "png"}), message.author.displayAvatarURL({dynamic: true, format: "png"}))
            .setColor('#FF69B4')

        db.query("SELECT `name`, `guildID` FROM Ping WHERE name = ? AND guildID = ?", [args.name, message.guild.id], function (err, result, fields) {
            if (err) return;
            if (result.length < 1) return message.channel.send({ embeds: [failedEmbed]})
            db.query("SELECT u.userID, p.pingID, p.name FROM User as u INNER JOIN UserPing as up ON u.userID = up.userID INNER JOIN Ping as p ON p.pingID = up.pingID WHERE p.guildID = ? AND up.userID = ? AND p.name = ?", [message.guild.id, message.author.id, args.name], function (err, result, fields) {
                if (result.length < 1) return message.channel.send({ embeds: [failedEmbed.setDescription(`You are not apart of the ${args.name} pinglist in this server.`)]})
                db.query("DELETE UserPing FROM UserPing INNER JOIN User as u On UserPing.userID = u.userID INNER JOIN Ping as p on UserPing.pingID = p.pingID WHERE p.guildID = ? AND u.userID = ? AND p.name = ?", [message.guild.id, message.author.id, args.name])
                return message.channel.send({ embeds: [embed.setDescription(`You have been successfully removed from the ${args.name} pinglist.`)]})
            })
        })
    }
}

module.exports = LPingDropCommand;