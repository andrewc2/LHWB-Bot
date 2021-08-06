const { Listener } = require('discord-akairo')

class CommandBlockedListener extends Listener {
    constructor() {
        super("commandBlocked", {
            event: "commandBlocked",
            emitter: "commandHandler",

        });
    }

    exec(message, command, reason) {
        const embed = this.client.util
            .embed()
            .setDescription(`You cannot use the \`${command.id}\` command at the moment.`)
            .setColor("RED");
        if (reason === "Missing Send Messages Permissions") {
            return console.log(reason);
        }
        else if (reason === "Bot Banned in Server" || reason === "Bot Banned") {
            embed
                .setDescription(`You cannot use the \`${command.id}\` command at the moment.`);
            return message.channel.send(embed);
        }
        else if (reason === "guild") {
            embed
                .setDescription(`You cannot use the \`${command}\` command in DMs. Please try again in a server.`);
            return message.channel.send(embed);
        }
        else if (reason === "owner") {
            embed
                .setDescription(`Only the bot owner can use the \`${command}\` command.`);
            return message.channel.send(embed);
        }
        else if (reason === "Command Channel Disabled") {
            embed
                .setDescription(`The \`${command}\` command has been disabled in ${message.channel}.`);
            return message.channel.send(embed);
        }
        else {
            message.channel.send(embed);
        }
    }
}

module.exports = CommandBlockedListener;