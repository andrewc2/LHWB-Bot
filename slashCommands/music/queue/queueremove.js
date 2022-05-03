const { SlashCommand } = require("discord-akairo");
const { MessageEmbed, Constants} = require("discord.js");
const { db } = require("../../../models/db");
const { FIND_SONG_IN_QUEUE } = require("../../../models/music-queries");
const { cmdRestrictionsNoVC } = require("../../../utilities/permissions");
const { dequeue } = require("../../../music");

class QueueRemoveCommand extends SlashCommand {
    constructor() {
        super('queueremove', {
            name: 'queue remove',
            prefixId: "dequeue",
            category: "music",
            channel: "guild",
            commandType: "sub",
            parentCommandName: "queue",
            shortCommandName: "remove",
            args: [
                {
                    name: "track",
                    description: "The name of the track to remove from the queue",
                    type: Constants.ApplicationCommandOptionTypes.STRING,
                    required: true,
                }
            ]
        });
    }

    async userPermissions(message) {
        return await cmdRestrictionsNoVC(message);
    }

    async exec(interaction, message) {
        await interaction.deferReply();
        const track = interaction.options.getString("track", true);
        const trackType = this.client.commandHandler.resolver.type("song");
        const findTrack = await trackType(message, track);

        const failEmbed = new MessageEmbed().setColor("RED");
        const successEmbed = new MessageEmbed().setColor("GREEN");

        if (!findTrack) {
            return await interaction.editReply({
                embeds: [failEmbed.setDescription("That song could not be found. Please check the track listings (/tracks).")]
            });
        }

        db.query(FIND_SONG_IN_QUEUE, [interaction.guild.id, findTrack["song_detail_id"]], function(err, result) {
            if (result.length > 0) {
                dequeue(findTrack["song_detail_id"], interaction.guild.id);
                return interaction.editReply({
                    embeds: [
                        successEmbed.setDescription(`${findTrack["official_name"]} has been removed from the queue.`),
                    ],
                });
            }
            else {
                return interaction.editReply({
                    embeds: [
                        failEmbed.setDescription("This song isn't in the queue at the moment."),
                    ],
                });
            }
        });
    }
}

module.exports = QueueRemoveCommand;
