const { Command, Argument } = require('discord-akairo');
const { commandUsage, isModNoVC } = require("../../utilities");

class BotUnbanCommand extends Command {
    constructor() {
        super("botunban", {
            aliases: ["botunban", "bunban"],
            category: "bot",
            description: {
                content: "Unbans a user or server from using the bot.",
                usage: "botunban <user|guild>",
                examples: [
                    "botunban iAndrewC"
                ]
            },
            args: [
                {
                    id: "user",
                    type: Argument.union("user", "guild"),
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage)
                }
            ]
        });
    }

    userPermissions(message) {
        return isModNoVC(message)
    }

    exec(message, args) {
        const embed = this.client.util
            .embed()
            .setColor("GREEN")

        const checkUser = this.client.settings.get(args.user.id, "ban");
        if (checkUser) {
            this.client.settings.delete(args.user.id, "ban")
            return message.channel.send({ embeds: [
                embed
                    .setDescription(`${args.user} has been bot unbanned.`)
                ] }
            )
        }
        else {
            return message.channel.send({ embeds: [
                embed
                    .setDescription(`${args.user} is not bot banned.`)
                    .setColor("RED")
                ] }
            )
        }
    }
}

module.exports = BotUnbanCommand