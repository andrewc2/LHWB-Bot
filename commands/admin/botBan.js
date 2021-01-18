const { Command, Argument } = require("discord-akairo");
const config = require("../../config.json");
const { commandUsage } = require("../../utilities");

class BotBanCommand extends Command {
    constructor() {
        super("botban", {
            aliases: ["botban", "bban"],
            category: "admin",
            ownerOnly: true,
            description: {
                content: "Bans a user or server from using the bot.",
                usage: "botban <user|guild>",
                examples: [
                    "botban iAndrewC"
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

    exec(message, args) {
        const embed = this.client.util
            .embed()
            .setColor("RANDOM")

        const protectedUsers = [this.client.ownerID, config.discord.serverID, this.client.user.id]
        if (protectedUsers.includes(args.user.id)) return message.channel.send(
            embed
                .setDescription(`${args.user} cannot be bot banned as it is a protected property.`)
                .setColor("RED")
        )

        const checkUser = this.client.settings.get(args.user.id, "ban");
        if (!checkUser) {
            this.client.settings.set(args.user.id, "ban", true)
            return message.channel.send(
                embed
                    .setDescription(`${args.user} has been bot banned.`)
            )
        }
        else {
            return message.channel.send(
                embed
                    .setDescription(`${args.user} is already bot banned.`)
                    .setColor("RED")
            )
        }
    }
}

module.exports = BotBanCommand