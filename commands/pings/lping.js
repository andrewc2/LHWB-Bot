const { Command, Flag } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { anyUsage } = require("../../utilities");
const config = require("../../config.json");

class LPingCommand extends Command {
    constructor() {
        super("lping", {
            aliases: ["lping"],
            category: "ping",
            channel: "guild",
            description: {
                content: "Returns the current general pinglists you are a part of, or pings a ping list.",
                usage: "lping / lping [listname] [message]",
                examples: [
                    "lping","lping chase link"
                ]
            }
        });
    }

    *args() {
        const pinglist = yield {
            type: 'lowercase',
            default: '',
            unordered: true
        }

        const method = yield {
            type: [
                ['lpingget', 'get'],
                ['lpingdrop', 'drop'],
                ['lpinglist', 'list'],
                ['lpingcreate', 'create'],
                ['lpingdelete', 'delete'],
            ]
        };

        if (method) return Flag.continue(method, true);
        return { pinglist }
    }

    userPermissions(message) {
        if (!message.util.parsed.content) return null;
        if (message.guild.id === config.discord.serverID) {
            if (message.member.roles.cache.some(role => role.id === config.discord.repRole)) return null;
            return "Role";
        } else if (message.member.hasPermission('MANAGE_MESSAGES')) {
            return null; 
        } else {
            return "Role"
        }
    }

    exec(message, args) {
        const failedEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Uh oh! Looks like you're not part of any lists.\nYou can set it by typing ${anyUsage(message.guild, message.client, 'lping get [name]')}`);

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: "png"}), message.author.displayAvatarURL({dynamic: true, format: "png"}))
            .setColor('#FF69B4')
            .setTitle('Assigned Pings')

        function standard() {
            db.query("SELECT u.userID, p.pingID, p.name FROM User as u INNER JOIN UserPing as up ON u.userID = up.userID INNER JOIN Ping as p ON p.pingID = up.pingID WHERE p.guildID = ? AND up.userID = ?", [message.guild.id, message.author.id], function (err, result) {
                if (err) return;
                if (result.length < 1) return message.channel.send(failedEmbed)
                let pings = []
                for (const rows of result.values()) pings.push(rows["name"])
                return message.channel.send(embed.setDescription(`\`${pings.join('` | `')}\``))
            })
        }

        function ping() {
            db.query("SELECT `name`, `guildID` FROM Ping WHERE name = ? AND guildID = ?", [args.pinglist, message.guild.id], function (err, result) {
                if (err) return;
                if (result.length < 1) return message.channel.send(failedEmbed.setDescription(`Uh oh! Looks like this pinglists does not exist.\nYou can can view available pinglists in this server by doing ${anyUsage(message.guild, message.client, 'lping list')}`))
                db.query("SELECT u.userID FROM User as u INNER JOIN UserPing as up ON u.userID = up.userID INNER JOIN Ping as p ON p.pingID = up.pingID WHERE p.guildID = ? AND p.name = ?", [message.guild.id, args.pinglist], async function (err, result) {
                    if (err) return
                    if (result.length < 1) return message.channel.send(failedEmbed.setDescription("It looks like nobody has this pinglist assigned. :confused:"))
                    let users = []
                    users.push(`${args.pinglist}`)
                    for (const rows of result.values()) {
                        await message.guild.members.fetch({user: rows.userID})
                            .then(user => {
                                users.push(user.user)
                            })
                            .catch(() => {})
                    }
                    if (users < 2) return message.channel.send(failedEmbed.setDescription("It looks like nobody has this pinglist assigned. :confused:"))
                    const sendList = users.join(` `).toString()
                    for (let i = 0; i < sendList.length; i += 2040) {
                        const toSend = sendList.substring(i, Math.min(sendList.length, i + 2040));
                        await message.channel.send(toSend)
                    }
                })
            })
        }

        if (args.pinglist === '') {
            standard()
        } else {
            ping()
        }
    }
}

module.exports = LPingCommand;