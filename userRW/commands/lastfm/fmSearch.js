const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { commandUsage } = require("../../utilities");
const { fetchFM } = require("./lastfm.js");

class LastFMSearchCommand extends Command {
    constructor() {
        super("lfmsearch", {
            aliases: ["lfm search"],
            category: "fm",
            description: {
                content: "Sets your lastfm profile.",
                usage: "lfm search [last.fm]",
                examples: [
                    "lfm search iAndrewC"
                ]
            },
            args: [
                {
                    id: 'username',
                    type: 'string',
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage)
                }
            ]
        });
    }

    exec(message, args) {
        if (args.username == null) {
            const embed = new MessageEmbed()
                .setColor('#FF69B4')
                .setDescription(`Uh oh! Looks like you forgot to give me a last.fm username to look up.\nTry \`!lfm search <username>\``);
            message.channel.send({embed});
        } else {
            fetchFM(message, args.username);
        }
    }
}

module.exports = LastFMSearchCommand;