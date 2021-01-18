const { Command, Flag } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { fetchFM } = require("./fmUtilities.js");

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
        return { user }
    }
    exec(message, args) {
        db.query("SELECT * FROM lastfm WHERE discordID=?", [args.user.id], function(err, rows) {
            if (rows[0] == null) {
                const embed = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`Uh oh! Looks like you have not saved your last.fm username.\nYou can set it by typing \`!lfm set <username>\`.`);
                message.channel.send({embed});
            } else {
                fetchFM(message, rows[0]['lastfmUsername']);
            }
        });
    }
}

module.exports = LastFMCommand;