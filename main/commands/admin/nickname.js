const { Command } = require('discord-akairo');
const { commandUsage } = require("../../utilities");

class NicknameCommand extends Command {
    constructor() {
        super("nickname", {
            aliases: ["nickname", "nick"],
            category: "admin",
            ownerOnly: true,
            description: {
                content: "Changes the bots nickname.",
                usage: "nickname [command]",
                examples: [
                    "nickname LosingHimWasBlue"
                ]
            },
            args: [
                {
                    id: 'username',
                    type: 'string',
                    match: 'content',
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage)
                }
            ]
        });
    }

    exec(message, args) {
        const embed = this.client.util
            .embed()
            .setColor("GREEN")

        message.channel.guild.me.setNickname(args.username);
        message.channel.send(embed.setDescription(`The nickname has been updated to: \`${args.username}\``));
    }
}

module.exports = NicknameCommand