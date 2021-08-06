const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class LastFMClearCommand extends Command {
    constructor() {
        super("lfmremove", {
            aliases: ["lfm clear"],
            category: "fm",
            description: {
                content: "Clears your Last.FM username from the database.",
                usage: "lfm clear",
                examples: [
                    "lfm clear"
                ]
            }
        });
    }

    exec(message) {
        db.query("DELETE FROM lastfm WHERE discordID=?", [message.author.id]);
        const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setDescription(`Your last.fm username has been successfully cleared!`);
        message.channel.send({ embeds: [embed] });
    }
}

module.exports = LastFMClearCommand;