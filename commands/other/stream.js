const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class streamCommand extends Command {
    constructor() {
        super("stream", {
            aliases: ["stream","livestream"],
            category: "other",
            description: {
                content: "Displays information about live streams.",
                usage: "stream",
                examples: [
                    "stream"
                ]
            }
        });
    }

    exec(message) {
        const embed = new MessageEmbed()
            .setColor(5218488)
            .setAuthor('Live Stream', 'https://lhwb.dev/ts.png', 'https://speaknow.rocks:1989/player/')
            .setURL(`https://speaknow.rocks:1989/player/`)
            .setDescription("[HLS Stream Player](https://speaknow.rocks:1989/)\n\nStream will be minimum 30sec behind from live\nIf you have issues please refresh your browser first.")
            .setFooter("Please do not share this stream outside of this discord server, or this stream will not be able to be provided.");
        message.channel.send({embed})
    }
}

module.exports = streamCommand;