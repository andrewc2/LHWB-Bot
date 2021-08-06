const { Command } = require("discord-akairo");

class ResumeCommand extends Command {
    constructor() {
        super("resume", {
            aliases: ["resume", "play", "lresume"],
            category: "music",
            channel: "guild",
            ownerOnly: true,
            description: {
                content: "Resumes music on the bot.",
                usage: "resume",
                examples: [
                    "resume"
                ]
            }
        });
    }

    async exec(message, args) {
        const embed = message.client.util
            .embed()
            .setDescription("Music has been resumed. :play_pause:")
            .setColor("GREEN")

        if (message.client.voice.broadcasts[0].dispatcher.paused) {
            message.client.voice.broadcasts[0].dispatcher.pause(false)
            message.client.voice.broadcasts[0].dispatcher.resume()
            return message.channel.send({ embeds: [embed] })
        }
        else {
            return message.channel.send(
                embed
                    .setDescription("Music isn't paused at the moment.")
                    .setColor("RED")
            )
        }
    }
}

module.exports = ResumeCommand;