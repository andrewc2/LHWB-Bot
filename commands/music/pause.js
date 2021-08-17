const { Command } = require("discord-akairo");
const { getVoiceConnection } = require('@discordjs/voice');
const { isModNoVC } = require("../../utilities");

class PauseCommand extends Command {
    constructor() {
        super("pause", {
            aliases: ["pause", "lpause"],
            category: "music",
            channel: "guild",
            description: {
                content: "Pauses music on the bot.",
                usage: "pause",
                examples: [
                    "pause"
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
            .setDescription("Music has been paused. :pause_button:")
            .setColor("GREEN")

        if(connection.state.subscription.player.state.status === "playing") {
            connection.state.subscription.player.pause();
            return message.channel.send({ embeds: [embed] })

        } else {
            return message.channel.send({ embeds: [
                embed
                    .setDescription("Music is already paused.")
                    .setColor("RED")
                ] }
            )
        }
    }
}

module.exports = PauseCommand;