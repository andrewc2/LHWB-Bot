const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const config = require("../../config.json");
const db = require("../../models/db");
const { regularRestriction, log, editDistance } = require("../../utilities");

class QueueCommand extends Command {
    constructor() {
        super("queue", {
            aliases: ["queue", "q"],
            category: "music",
            channel: "guild",
            description: {
                content: "Adds a song to the music queue.",
                usage: "queue [song]",
                examples: [
                    "queue Red"
                ]
            },
            args: [
                {
                    id: "song",
                    type: "lowercase",
                    match: "content"
                }
            ]
        });
    }

    userPermissions(message) {
        return regularRestriction(message)
    }

    exec(message, args) {
        const queueEmbed = new MessageEmbed()
            .setColor('#FF69B4') //pink
            .setURL('https://lhwb.dev/')

        const failEmbed = new MessageEmbed()
            .setColor("RED")

        const successEmbed = new MessageEmbed()
            .setColor("#FF69B4")

        function getSongs(array, songQueue) {
            for(let num = 0; num < array.length; num++)
                songQueue = songQueue + `${num+1}. ${array[num]['name']}\n`;
            return songQueue;
        }

        async function printQueue() {
            db.query("SELECT id, name FROM recent WHERE 1 ORDER BY id DESC", function(err, rows) {
                let playingSong = rows[0]['name'];
                db.query("SELECT id, name FROM queue WHERE 1 ORDER BY id ASC", function(err, rows2) {
                    let songQueue = "";

                    if(rows2.length > 0 && rows[0]['queuedby'] !== null && rows[0]['name'] === rows2[0]['name']){
                        queueEmbed.setTitle(`Currently Playing: ${playingSong} (Queued)`)
                        rows2.shift()
                        songQueue = getSongs(rows2, songQueue)

                        if (songQueue.length < 1) {
                            return message.channel.send(queueEmbed.setDescription("There's nothing else queued at the moment..."));
                        } else {
                            return message.channel.send(queueEmbed.setDescription(`Queued for play:\n${songQueue}`));
                        }
                    } else if (rows2.length > 0) {
                        songQueue = getSongs(rows2, songQueue)

                        return message.channel.send(queueEmbed.setTitle(`Currently Playing: ${playingSong}`)
                            .setDescription(`Queued for play:\n${songQueue}`));
                    } else {
                        return message.channel.send(failEmbed.setDescription("There's nothing queued at the moment..."));
                    }
                });
            });
        }

        async function fetchSong() {
            
            let title = args.song;
            let user = message.author.username;
            
            log(`Title: ${title}`);
            fuzzySearch(title.toLowerCase(), async function(result){
                if(result){ //song found in db after fuzzy search
                    db.query("SELECT * FROM queue WHERE path LIKE ? ORDER BY path ASC", [result['path']], function(err, rows2){
                        if(rows2.length > 1){
                            message.channel.send(failEmbed.setDescription(`${result['name']} is already in the queue and was not added.`));
                        } else {
                            fs.access(`${config.discord.music_path}${result['path']}`, fs.F_OK, async (err) => {
                                if (err) {
                                    return message.channel.send(failEmbed.setDescription("I know this song but I couldn't find the file. :thinking:"))
                                }
                                db.query("INSERT INTO queue (name, path, queuedby) VALUES (?,?,?)", [result['name'], result['path'], user]);
                                message.channel.send(successEmbed.setDescription(`${result['name']} has been added to the queue.`));
                                log(`Song: ${result['name']} Path: ${result['path']} Queued By: ${user}`);
                            })
                        }
                    })
                }else{
                    message.channel.send(failEmbed.setDescription("That song could not be found.\nPlease check the track listings (!tracks).\nIf it's not there ask iandrewc to add the song."));
                }
            });
        }

        async function fuzzySearch(title, callback){
            let result;
            let maxEditDist = 5;
            let minEditDist = maxEditDist;
            db.query("SELECT path,name FROM music", function(err, songList) {
                let i;
                for(i = 0; i < songList.length; i++){
                    editDistance(title, songList[i]['name'].toLowerCase(), function(tempDist){
                        if(tempDist < minEditDist && tempDist <= maxEditDist){
                            minEditDist = tempDist;
                            result = songList[i]
                        }
                    });
                } 
                callback(result);
            });
        }

        if (!args.song) {
            return printQueue()
        }
        else {
            return fetchSong()
        }
    }
}

module.exports = QueueCommand;