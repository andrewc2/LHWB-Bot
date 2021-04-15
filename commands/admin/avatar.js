const { Command } = require('discord-akairo');
const { commandUsage } = require("../../utilities");

class AvatarCommand extends Command {
    constructor() {
        super("lavatar", {
            aliases: ["lavatar"],
            category: "admin",
            ownerOnly: true,
            description: {
                content: "Changes the bots avatar.",
                usage: "lavatar [url]",
                examples: [
                    "lavatar link"
                ]
            },
            args: [
                {
                    id: 'url',
                    type: 'string',
                    match: 'content',
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage)
                }
            ]
        });
    }

    exec(message, args) {
        let selena = `https://i.imgur.com/7rYMWjO.png`;
        let taylor = `https://i.imgur.com/NggyZ5P.png`;

        const embed = this.client.util
            .embed()
            .setColor("GREEN")

        if(args.url == 'taylor') {
            this.client.user.setAvatar(taylor);
        } else if (args.url == 'selena') {
            this.client.user.setAvatar(selena);
        } else {
            this.client.user.setAvatar(args.url);
        }
        message.channel.send(embed.setDescription(`The avatar has been updated`));
    }
}

module.exports = AvatarCommand