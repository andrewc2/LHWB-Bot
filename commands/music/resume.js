const { Command } = require("discord-akairo");
const { getVoiceConnection } = require('@discordjs/voice');
const { isModNoVC } = require("../../utilities");

class ResumeCommand extends Command {
    constructor() {
        super("resume", {
            aliases: ["resume", "play", "lresume"],
            category: "music",
            channel: "guild",
            description: {
                content: "Resumes music on the bot.",
                usage: "resume",
                examples: [
                    "resume"
                ]
            }
        });
    }

    userPermissions(message) {
        return isModNoVC(message)
    }

    async exec(message, args) {
        const connection = getVoiceConnection(message.guild.id);
        const embed = message.client.util
            .embed()
            .setDescription("Music has been resumed. :play_pause:")
            .setColor("GREEN")
            
        if(connection.state.subscription.player.state.status === "paused") {
            connection.state.subscription.player.unpause();
            return message.channel.send({ embeds: [embed] })

        } else {
            return message.channel.send({ embeds: [
                embed
                    .setDescription("Music isn't paused at the moment.")
                    .setColor("RED")
                ] }
            )
        }
    }
}

module.exports = ResumeCommand;