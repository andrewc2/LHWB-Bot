const { Command } = require("discord-akairo");
const config = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class currentCommand extends Command {
    constructor() {
        super("current", {
            aliases: ["current"],
            category: "music",
            description: {
                content: "Shows what song is currently playing.",
                usage: "current",
                examples: [
                    "current"
                ]
            }
        });
    }

    userPermissions(message) {
        if (message.guild.id !== config.discord.serverID) return true;
    }

    async exec(message, args) {
        const embed = new MessageEmbed()
            .setColor('#FF69B4') //pink

        db.query("SELECT id, name, album, queuedby FROM recent WHERE 1 ORDER BY id DESC LIMIT 1", function(err, rows) {
            let currentAlbum = rows[0]['album'];
            let currentSong = rows[0]['name'];
            let queuedBy = rows[0]['queuedby'];
            
            db.query("SELECT name, albumart FROM music where name = ?",[currentSong], function(err, rows2) {
                let albumArt = rows2[0]['albumart'];

                embed.setTitle(currentSong)
                    .setDescription(currentAlbum)
                    .setThumbnail(albumArt)

                if(queuedBy) {
                    embed.setFooter(`Queued by: ${queuedBy}`);
                } 
                return message.channel.send({ embeds: [embed] });
                
            });
        });
    }
}

module.exports = currentCommand;