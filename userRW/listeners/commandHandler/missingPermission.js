const { Listener } = require("discord-akairo");
const config = require("../../config.json")

class MissingPermissionListener extends Listener {
    constructor() {
        super("missingPermission", {
            event: "missingPermissions",
            emitter: "commandHandler"
        });
    }

    exec(message, command, type, missing) {
        const embed = this.client.util
            .embed()
            .setColor("RED")
        if (type === "client") {
            embed
                .setDescription(`I cannot use the \`${command}\` command in this server as I am missing the \`${missing}\` permissions. Try again later.`)
            return message.channel.send(embed)
        }
        else if (missing === "Server") {
            embed
                .setDescription(`You cannot use the \`${command}\` command in this server. :x:`)
            return message.channel.send(embed)
        }
        else if (missing === "Voice") {
            embed
                .setDescription(`You must be in the **${message.client.channels.cache.get(config.discord.channelID).name}** voice channel in order to use the \`${command}\` command. :grinning:`)
            return message.channel.send(embed)
        }
        else if (missing === "Channel") {
            embed
                .setDescription(`Does this look like a spam channel? Use the \`${command}\` command in <#${config.discord.botsChannel}> :woman_facepalming:`)
            return message.channel.send(embed)
        }
        else {
            embed
                .setDescription(`You do not have have permission to use the \`${command}\` command. :confused:`)
            return message.channel.send(embed)
        }
    }
}

module.exports = MissingPermissionListener;