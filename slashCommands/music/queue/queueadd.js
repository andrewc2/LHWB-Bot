const { SlashCommand } = require("discord-akairo");
const { Constants, MessageEmbed } = require("discord.js");
const fs = require("fs");
const { db } = require("../../../models/db");
const { autocomplete } = require("../../../slashCommandUtilities/queueutilities");
const { ADD_TO_QUEUE, FIND_SONG_IN_QUEUE } = require("../../../models/music-queries");
const config = require("../../../config.json");
const { isVoiceServer, regularRestriction } = require("../../../utilities/permissions");

class QueueAddCommand extends SlashCommand {
    constructor() {
        super('queueadd', {
            name: 'queue add',
            prefixId: "queue",
            category: "music",
            channel: "guild",
            commandType: "sub",
            parentCommandName: "queue",
            shortCommandName: "add",
            args: [
                {
                    name: "track",
                    description: "The name of the track to queue",
                    type: Constants.ApplicationCommandOptionTypes.STRING,
                    required: true,
                    autocomplete: true
                }
            ]
        });
    }

    userPermissions(message) {
        if (isVoiceServer(message.guild.id)) return "Server";
        return regularRestriction(message);
    }

    async exec(interaction, message) {
        await interaction.deferReply();
        const track = interaction.options.getString("track", true);
        const trackType = this.client.commandHandler.resolver.type("song");
        const findTrack = await trackType(message, track);

        const failEmbed = new MessageEmbed().setColor("RED");
        const successEmbed = new MessageEmbed().setColor("#FF69B4");

        if (!findTrack) {
            return await interaction.editReply({
                embeds: [failEmbed.setDescription("That song could not be found.\nPlease check the track listings (/tracks).\nIf it's not there ask iAndrewC to add the song.")]
            });
        }

        db.query(FIND_SONG_IN_QUEUE, [interaction.guild.id, findTrack["song_detail_id"]], function(err, result) {
            if (result.length > 2) {
                return interaction.editReply({
                    embeds: [
                        failEmbed.setDescription(`${findTrack["official_name"]} is already in the queue and was not added.`),
                    ],
                });
            }
            fs.access(`${config.music.filepath}${findTrack.path}`, fs.constants.F_OK, async (err) => {
                    if (err) {
                        return interaction.editReply({
                            embeds: [
                                failEmbed.setDescription("I know this song but I couldn't find the file. :thinking:"),
                            ],
                        });
                    }
                    db.query(ADD_TO_QUEUE, [findTrack["song_detail_id"], interaction.guild.id, interaction.user.tag]);
                    return interaction.editReply({
                        embeds: [
                            successEmbed.setDescription(`${findTrack["official_name"]} has been added to the queue.`),
                        ],
                    });
                },
            );
        });
    }

    async autocomplete(interaction) {
        await autocomplete(interaction);
    }
}

module.exports = QueueAddCommand;
