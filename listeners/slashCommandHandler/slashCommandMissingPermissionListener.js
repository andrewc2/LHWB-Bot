const { Listener } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const voiceServers = require("../../voice-servers.json");

class SlashCommandMissingPermissionListener extends Listener {
    constructor() {
        super("slashCommandMissingPermissionListener", {
            event: "missingPermissions",
            category: "slashCommandHandler",
            emitter: "slashCommandHandler",
        });
    }

    exec(message, command, type, missing) {
        const embed = new MessageEmbed()
            .setColor('RED');

        if (type === "client") {
            embed.setDescription(
                `I cannot use the **${command.name.toLowerCase()}** command in this server as I am missing the \`${missing.join(`, `)}\` permission. Try again later.`
            );
        } else {
            switch (missing) {
                case "Server":
                    embed
                        .setDescription(`You cannot use the \`${command.aliases[0]}\` command in this server. :x:`);
                    break;
                case "Voice":
                    const channel = message.client.channels.cache.get(voiceServers.find(x => x.server_id === message.guild.id).channel_id).name;
                    embed
                        .setDescription(`You must be in the **${channel}** voice channel in order to use the **${command.name}** command. :grinning:`);
                    break;
                case "Channel":
                    embed
                        .setDescription(`Does this look like a spam channel? Use the **${command.name}** command in a spam channel :woman_facepalming:`);
                    break;
                case "Role":
                    embed
                        .setDescription(`You don't have the correct permissions to use the **${command.name}** command. :pensive:`);
                    break;
                default:
                    embed
                        .setDescription(`You do not have have permission to use the **${command.name}** command. :confused:`);
            }
        }

        return message.interaction.reply({ embeds: [embed], ephemeral: true });
    }
}

module.exports = SlashCommandMissingPermissionListener;
