const { Command } = require("discord-akairo");
const { db } = require("../../models/db");
const { MessageEmbed } = require("discord.js");
const { commandUsage } = require("../../utilities");

class ChannelDisable extends Command {
    constructor() {
        super("channeldisable", {
            aliases: ["channel disable"],
            category: "other",
            description: {
                content: "Disable a command in a channel.",
                usage: "channel disable <command>",
                examples: [
                    "channel disable lping",
                ],
            },
            args: [
                {
                    id: "command",
                    type: "commandAlias",
                    match: "content",
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
                },
            ],
        });
    }

    exec(message, args) {
        const failedEmbed = new MessageEmbed()
            .setColor('RED');

        const embed = new MessageEmbed()
            .setColor('#FF69B4');

        const guildID = message.guild.id;
        const channelID = message.channel.id;
        const commandID = args.command.id;
        const guardedCommands = ["channeldisable", "channelenable", "channel"];

        if (guardedCommands.includes(commandID)) {
            return message.channel.send(failedEmbed.setDescription("This cannot be disabled as it is an essential command. :sob:"));
        }

        db.query("SELECT * FROM `command` WHERE `guildID` = ? AND `channelID` = ? AND `commandID` = ?", [guildID, channelID, commandID], function(err, result) {
            if (err) return;
            if (result.length > 0) {
                return message.channel.send(failedEmbed.setDescription("Command already disabled. :sob:"));
                
            }
            else {
                db.query("INSERT INTO `command` (`guildID`, `channelID`, `commandID`) VALUES (?,?,?)", [guildID, channelID, commandID]);
                return message.channel.send(embed.setDescription("Command has been disabled. :smiley:"));
            }
        });
    }
}

module.exports = ChannelDisable;