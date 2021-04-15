const { Command, Flag } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class LPingCommand extends Command {
    constructor() {
        super("lping", {
            aliases: ["lping"],
            category: "ping",
            description: {
                content: "Returns the current general pinglists you are a part of.",
                usage: "lping",
                examples: [
                    "lping"
                ]
            }
        });
    }

    *args() {
        const user = yield {
            type: 'relevant',
            default: message => message.author,
            unordered: true
        }

        const method = yield {
            type: [
                ['lpingget', 'get'],
                ['lpingdrop', 'drop']
            ]
        };

        if (method) return Flag.continue(method)
        return { user }
    }
    exec(message, args) {
        let pinglist;
        db.query("SELECT * FROM pings WHERE discordID=?", [args.user.id], function(err, rows) {
            if (rows[0] == null) {
                const embed = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`Uh oh! Looks like you're not part of any lists.\nYou can set it by typing \`!lping get <ping>\`.`);
                message.channel.send({embed});
            } else {
                if (rows[0].chase == 1)
                    pinglist = 'Enabled';
                else
                    pinglist = 'Disabled';

                const embed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: "png"}), message.author.displayAvatarURL({dynamic: true, format: "png"}))
                    .setColor(16711680)
                    .setTitle('Pings Available')
                    .addField('Chase', pinglist, true)
                message.channel.send({embed});
                
            }
        });
    }
}

module.exports = LPingCommand;