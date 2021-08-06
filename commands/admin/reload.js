const { Command, Argument } = require("discord-akairo");
const { commandUsage } = require("../../utilities");

class ReloadCommand extends Command {
    constructor() {
        super("reload", {
            aliases: ["reload"],
            category: "admin",
            ownerOnly: true,
            description: {
                content: "Reloads a command.",
                usage: "reload [command]",
                examples: [
                    "reload queue"
                ]
            },
            args: [
                {
                    id: "command",
                    type: Argument.union("commandAlias", "listener"),
                    match: "content",
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage)
                }
            ]
        });
    }

    exec(message, args) {
        const embed = this.client.util
            .embed()
            .setColor("GREEN")

        args.command.reload()
        return message.channel.send({ embeds: [embed.setDescription(`The \`${args.command.id}\` command has been reloaded. :relaxed:`)] }
        )
    }
}

module.exports = ReloadCommand