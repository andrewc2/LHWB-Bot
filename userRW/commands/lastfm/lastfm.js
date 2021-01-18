const { Command, Flag } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const config = require("../../config.json");
const lfmAPI = require("lastfmapi");

const lfm = new lfmAPI({
    api_key : config.lastfm.lfmAPIKey,
    secret  : config.lastfm.lfmAPISecret
});

function fetchFM(message, target) {
    lfm.user.getRecentTracks({
        limit : 2,
        user  : target
    }, function (err, recentTracks) {
        if (err) { console.log(err); }
        try {
            const nowPlaying = false;
            const status = "";
            try {
                if (recentTracks.track[0]["@attr"].nowplaying) {
                    nowPlaying = true;
                }
            } catch (undef) { // undefined
                console.log(undef);
            }

            switch (nowPlaying) {
                case true:
                    status = "Current";
                    break;
                case false:
                    status = "Most Recent";
                    break;
            }
            const embed = new MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setAuthor(target, `https://i.imgur.com/x5AhTlq.png`, `https://www.last.fm/user/${recentTracks["@attr"].user}`)
                .addField(`${status} Song`, `${recentTracks.track[0].name}`, true)
                .addField(`${status} Artist`, `${recentTracks.track[0].artist["#text"]}`, true)
                .addField('\u200b', '\u200b', true)
                .addField("Previous Song", `${recentTracks.track[1].name}`, true)
                .addField("Previous Artist", `${recentTracks.track[1].artist["#text"]}`, true)
                .addField('\u200b', '\u200b', true)
                .setThumbnail(`${recentTracks.track[0].image[3]["#text"]}`);
                if(nowPlaying) {
                    embed.setFooter(`Total Scrobbles: ${recentTracks["@attr"].total} - Currently Scrobbling`);
                } else {
                    embed.setFooter(`Total Scrobbles: ${recentTracks["@attr"].total} - Last scrobbled on: ${recentTracks.track[0].date["#text"]} (UTC)`);
                }
            message.channel.send({embed});
            console.log("Track 0: " + recentTracks.track[0].name);
            console.log("Track 1: " + recentTracks.track[1].name);
            console.log(`${recentTracks.track[0].image[3]["#text"]}`);
            
        } catch (unf) { // user not found
            console.log(unf);              
            const embed = new MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setDescription(`${target} is either not a last.fm user, has not scrobbled any songs yet, or the API is down, try again later if the user is definitely correct!`);

            message.channel.send({embed});
        }
    });
}

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

module.exports = { LastFMCommand, fetchFM };