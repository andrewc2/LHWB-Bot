const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { commandUsage } = require("../../utilities");

class LastFMSetCommand extends Command {
    constructor() {
        super("lfmset", {
            aliases: ["lfm set"],
            category: "fm",
            description: {
                content: "Sets your lastfm profile.",
                usage: "lfm set [last.fm]",
                examples: [
                    "lfm set iAndrewC"
                ]
            },
            args: [
                {
                    id: 'username',
                    type: 'string',
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage)
                }
            ]
        });
    }

    exec(message, args) {
        db.query(
            "INSERT INTO lastfm (lastfmUsername, discordTag, discordID) VALUES (?,?,?) " +
            "ON DUPLICATE KEY UPDATE lastfmUsername=?, discordTag=?",
            [args.username, message.author.tag, message.author.id, args.username, message.author.tag], function (err, result) {
                if (err) throw err;
                    console.log(result);
            });
        const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setDescription(`Your last.fm username has been set to ${args.username}.`);
        message.channel.send({embed});
    }
}

module.exports = LastFMSetCommand;