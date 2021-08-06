const { Command } = require("discord-akairo");
const { cmdRestrictionsNoVC, anyUsage} = require("../../utilities");

class ChaseCommand extends Command {
    constructor() {
        super("chasegang", {
            aliases: ["chase", "chasegang"],
            category: "other",
            channel: "guild",
            cooldown: 3000,
            ratelimit: 1,
            description: {
                content: "Pings the Chase Gang for a police chase (Limited to reproom role).",
                usage: "chasegang",
                examples: [
                    "chasegang"
                ]
            },
            args: [
                {
                    id: 'mention',
                    type: 'string',
                    match: 'content'
                }
            ]
        });
    }

    userPermissions(message) {
        return cmdRestrictionsNoVC(message)
    }

    exec(message, args) {
        const embed = this.client.util
            .embed()
            .setColor("RED")

        message.channel.send({ embeds: [embed.setDescription(`This command has been depreciated, please use ${anyUsage(message.guild, message.client, 'lping chase')}`)]});
    }
}

module.exports = ChaseCommand;