const { Command, Flag } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { fetchFM } = require("./lastfm.js");

class LastFMCommand extends Command {
    constructor() {
        super("lfm", {
            aliases: ["lfm"],
            category: "fm",
            description: {
                content: "Returns yours or another users last scrobbled song.",
                usage: "lfm <user>",
                examples: [
                    "lfm iAndrewC"
                ]
            }
        });
    }

    *args() {
        const user = yield {
            type: 'relevant',
            default: message => message.author,
            unordered: true
        }

        const method = yield {
            type: [
                ['lfmsearch', 'search'],
                ['lfmset', 'set'],
                ['lfmremove', 'clear']
            ]
        };

        if (method) return Flag.continue(method)
        return { username }
    }
    exec(message, args) {
        message.channel.send('lfm test hi');
        if (args.username == null) {
            db.query("SELECT * FROM lastfm WHERE discordID=?", [message.author.id], function(err, rows) {
                if (rows[0] == null) {
                    const embed = new MessageEmbed()
                        .setColor(message.member.displayHexColor)
                        .setDescription(`Uh oh! Looks like you have not saved your last.fm username.\nYou can set it by typing \`!lfm set <username>\`.`);

                    message.channel.send({embed});
                } else {
                    fetchFM(message, rows[0]['lastfmUsername']);
                }
            });
        } else {
            try {
                const mentionedUser = message.mentions.members.first();
    
                db.query("SELECT * FROM lastfm WHERE discordID=?", [mentionedUser.user.id], function(err, rows) {
                    if (rows[0] == null) {
                        const embed = new MessageEmbed()
                            .setColor(message.member.displayHexColor)
                            .setDescription(`Uh oh! Looks like ${message.guild.cache.member(mentionedUser).displayName} has not saved their last.fm username.\nThey may set it by typing \`!lfm set <username\`.`);
    
                        message.channel.send({embed});
                    } else {
                        fetchFM(message, rows[0]['lastfmUsername']);
                    }
                });
            } catch (err) {
                console.log(`${time()} - ${err}`);
                const embed = new MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setDescription(`Uh oh! Looks like you forgot to mention the user you want to look up.\nIf you don't want to mention a user, try using \`!lfm search <username>\``);
                message.channel.send({embed});
            }
        }
    }
}

module.exports = LastFMCommand;