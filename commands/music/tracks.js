const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class TracksCommand extends Command {
    constructor() {
        super("tracks", {
            aliases: ["tracks", "track", "tracklist"],
            category: "music",
            cooldown: 3000,
            ratelimit: 1,
            description: {
                content: "Shows a list of available songs.",
                usage: "tracks",
                examples: [
                    "tracks"
                ]
            }
        });
    }

    exec(message, args) {
        const embed = new MessageEmbed()
            .setAuthor(`${message.client.user.username} TrackList`, message.client.user.displayAvatarURL({ dynamic: true, format: "png" }), message.client.user.displayAvatarURL({ dynamic: true, format: "png" }))
            .setDescription("The full requestable track list is here: https://lhwb.dev/lhwb.php")
            .setColor('#9979FF')
        return message.channel.send({ embeds: [embed] });
    }
}

module.exports = TracksCommand;