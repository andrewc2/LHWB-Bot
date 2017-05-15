var Discord = require('discord.io');
var fs = require('fs');
var creds = require('../auth.json');
var mysql = require('mysql');

var db = mysql.createPool({
    host: creds.mysqlHost,
    user: creds.mysqlUser,
    password: creds.mysqlPassword,
    database: creds.database
});

var bot = new Discord.Client({
    autorun: true,
    token: creds.token
});

bot.on('ready', function(event) {
    bot.getAllUsers();
});

var firstJoin = true;
var chan = creds.voice_channel;

// Announce bot has logged in after connecting to discord, then joining main voice chat and starting playing after 5 sec delay
bot.on('allUsers', function(event) {
    console.log(time() + ' Logged in as %s - %s\n', bot.username, bot.id);
    console.log('Joining voice chat and playing after 5 seconds');
    setTimeout(joinRed, 5000);
});

function joinRed(){
    bot.joinVoiceChannel(chan, function(err, event){
        if (err) return console.log(time() + ` Unable to join ${channelID} \n ${err}` + " " + event); //prints voice errors
        event.once('disconnect', function(channelID) { //handles voice disconnects
            var voiceChannel = bot.channels[channelID];
            var voiceServer = bot.servers[voiceChannel.guild_id];
            console.log(time() + ` -- Disconnected from voiceChannel: ${voiceChannel.name}, in voiceServer ${voiceServer.name} --`);
            //stops music, and rejoins Red voice channel, and beings playing
            bot.leaveVoiceChannel(creds.voice_channel); //Tells the bot to leave Red
            setTimeout(joinRed, 5000);
        });
    });
    //join("130759361902542848", " Red"); //Passes a text channel ID and voice channel to simulate a chat user entering !join Red
    if (firstJoin) setTimeout(play, 5000); //Delays playing to make sure the bot is in the voice channel and doesn't play if it wasn't the first join
    firstJoin = false;
}

// Automatically reconnect if the bot disconnects from Discord
bot.on('disconnect', function(err, event) {
    console.log(time() + ' -- Bot Disconnected from Discord with code' + event + ' for reason: ' + err + ' --');
    bot.leaveVoiceChannel(creds.voice_channel); //Tells the bot to leave Red
    setTimeout(bot.connect, 20000);
});

var queue = [];
var queuedBy = "";
var recent = [];

bot.on('message', function(user, userID, channelID, message, event) {

    var cmd = message.split(" ");
    
    switch(cmd[0].toLowerCase()){
        case "!rjoin":
            if(isMod(channelID,userID))
                join(channelID,message);
            break;
        case "!play":
            if(isMod(channelID,userID))
                setTimeout(play, 5000);
            break;
        case "!rstop":
            if(isMod(channelID,userID))
                stop();
            break;
        case "!q":
        case "!queue":
            if(channelID == "132026417725702145" || isMod(channelID,userID)) { //check if user is in bots or mod
                q(message,channelID,user,userID,cmd);
            }
            break;
        case "!dq":
        case "!dequeue":
            if(isMod(channelID,userID))
                dequeue(message, channelID, userID);
            break;
        case "!skip":
            if(isMod(channelID,userID))
                skip(user);
            break;
        case "!cq":
        case "!clearqueue":
            if(isMod(channelID,userID))
                clear(channelID,userID);
            break;
        case "!current":
            current(channelID,userID);
            break;
        case "!recent":
        case "!recentlyplayed":
            if(channelID == "132026417725702145" || isMod(channelID,userID)) {
                recentlyPlayed(channelID);
            }
            break;
        case "!playcount":
            if(channelID == "132026417725702145" || isMod(channelID,userID)) {
                playCount(channelID, message, userID);
            }
            break;
        case "!rankplays":
            if(channelID == "132026417725702145" || isMod(channelID,userID)) {
                rankPlays(channelID, message, userID);
            }
            break;
        case "!tracks":
            tracks(channelID, message, userID,user);
            break;
        case "!redbotrequest":
            request(channelID, message, userID,user);
            break;
        default:
    }
});
function join(channelID,message){
    var channel = message.substring(message.indexOf(" ") + 1); //voice channel to be joined
    var server = bot.channels[channelID].guild_id; //server bot is in
    var channels = bot.servers[server].channels; //channels on the server
            
    Object.keys(channels).forEach(function(key) {
        if(channels[key].name === channel){ //checks every voice channel if it's what the user entered
            bot.joinVoiceChannel(channels[key].id, function(err, event){
                console.log("Joined " + channel);
                chan = channels[key].id;
                if (err) { //prints voice errors
                    bot.sendMessage({to:channelID,message: "Cannot join voice channel, tell iAndrewC to restart the bot"});
                    return console.log(time() + ` Unable to join ${channelID} \n ${err}` + " " + event);
                }
                event.once('disconnect', function(channelID) { //handles voice disconnects
                    var voiceChannel = bot.channels[channelID];
                    var voiceServer = bot.servers[voiceChannel.guild_id];
                    console.log(time() + ` -- Disconnected from voiceChannel: ${voiceChannel.name}, in voiceServer ${voiceServer.name} --`);
                    //stops music, and rejoins Red voice channel, and beings playing
                    bot.leaveVoiceChannel(creds.voice_channel); //Tells the bot to leave Red
                    setTimeout(joinRed, 5000);
                });
            });
        }
    });


}

function isMod(channelID, userID){
    var serverID = bot.channels[channelID] && bot.channels[channelID].guild_id;
    if (!serverID) return console.log("This message was probably sent as a DM");
    if(!bot.servers[serverID]) return console.log('Woah, the bot isnt even on this server?');
    if(!bot.servers[serverID].members[userID]) return console.log('Is this guy even on the server?');
    var roleIdsAsArray = bot.servers[serverID].members[userID].roles; //adds all server roles to array
    if(roleIdsAsArray.indexOf('115334158892531719') > -1 || roleIdsAsArray.indexOf('115333509580718080') > -1) return true; //makes sure user fits one of these roles before saying they're a mod
    if (userID === creds.iandrewc) return true; //lets iandrewc use his own bot
    
    //If nothing matches, the user is not mod
    return false;
}

var stopped = false;

var currentSong;
function play(){
    stopped = false;
    var rand;
    bot.getAudioContext(chan, function(err,stream) {
        if (err) return console.error(err);

        if(queue.length > 0){
            console.log("There is a queue.");
            var temp = queue.shift();
            if(temp.path === "Random.mp3"){ //Allows for queueing a random song when Random.mp3 is queued
                db.getConnection(function(err, connection){
                    db.query("SELECT DISTINCT path FROM music WHERE type != ? ORDER BY RAND() LIMIT 1",["unreleased"], function(err,result) {
                        if(result != null) {
                            queuedBy = temp.user;
                            currentSong = result[0]['path'];
                            console.log(currentSong.slice(0,-4) + " is now playing");
                            addPlay(currentSong);
                            addToRecent(currentSong.slice(0,-4));
                            stream.playAudioFile('/home/redbot/music/' + currentSong);
                            bot.setPresence( {game: {name:currentSong.slice(0,-4)}} ); //sets Playing to current song
                            console.log("Played random song");
                        }
                    });
                    connection.release();
                });
            }else{
                currentSong = temp.path;
                queuedBy = temp.user;
                console.log(queuedBy);
                addPlay(currentSong);
                addToRecent(currentSong.slice(0,-4));
                stream.playAudioFile('/home/redbot/music/' + currentSong);
                bot.setPresence( {game: {name:currentSong.slice(0,-4)}} ); //sets Playing to current song
                console.log(currentSong.slice(0,-4) + " is now playing");
                console.log("Played user requested song, not random");
            }
        }else{
            db.getConnection(function(err, connection){
                if(!err){
                    db.query("SELECT DISTINCT path FROM music WHERE type != ? ORDER BY RAND() LIMIT 1",["unreleased"], function(err,result) {
                    //gets path from the music db, and randomly selects a non-unreleased track
                        if(result != null) {
                            queuedBy = "";
                            currentSong = result[0]['path'];
                            console.log(currentSong.slice(0,-4) + " is now playing");
                            addPlay(currentSong);
                            addToRecent(currentSong.slice(0,-4));
                            //fs.createReadStream('/home/redbot/music/' + currentSong).pipe(stream, {end:false}); new version of playAudioFile
                            stream.playAudioFile('/home/redbot/music/' + currentSong);
                            bot.setPresence( {game: {name:currentSong.slice(0,-4)}} ); //sets Playing to current song
                            console.log("Queue empty, Playing songs randomly");
                        }
                    });
                    connection.release();
                } else {
                    console.log(err);
                }
            });
        };
        //stream.once('done',function(){ //new stream output
        stream.once('fileEnd',function(){
            console.log("Song Ended");
            if(!stopped){
                setTimeout(function(){
                    play();
                }, 2000);
                console.log("Playing next song");
            }
        });
    });
}

function addPlay(song){
    db.query("UPDATE music SET playcount = playcount + 1 WHERE path = ?",[song])
}

function current(channelID,userID){
    if(queuedBy != "") {
        db.query("SELECT album, albumart FROM music WHERE name = ?",[currentSong.slice(0,-4)], function(err,result) {
            var currentAlbum = result[0]['album'];
            var albumArt = result[0]['albumart'];
            bot.sendMessage({ to:channelID,
                embed: {
                    color: 0x442691,
                    title: currentSong.slice(0,-4),
                    description: currentAlbum,
                    thumbnail: {
                        url: albumArt,
                    },
                    footer: {
                        text: "Queued by: " + queuedBy,
                    },
                }
            });
        });
    } else {
        db.query("SELECT album, albumart FROM music WHERE name = ?",[currentSong.slice(0,-4)], function(err,result) {
            var currentAlbum = result[0]['album'];
            var albumArt = result[0]['albumart'];
            bot.sendMessage({ to:channelID,
                embed: {
                    color: 0x442691,
                    title: currentSong.slice(0,-4),
                    description: currentAlbum,
                    thumbnail: {
                        url: albumArt,
                    },
                }
            });
        });
    }
}

/* The reason for the stopped bool is because stopping the song will emit 'fileEnd' which will automatically play a song.
 */
function stop(){
    bot.getAudioContext(chan, function(err,stream) {
        stopped = true;
        //setTimeout(function(){ stream.unpipe();},1000);
        setTimeout(function(){ stream.stopAudioFile();},1000); //new version stream.unpipe()
    });
}

function q(message, channelID, user, userID, cmd){
    queueObj = { };
    if((message.toLowerCase() === "!queue") || (message.toLowerCase() === "!q")){
        printQ(message,channelID);
    }else{
            var voiceChannel = bot.channels[creds.voice_channel] //assumes using the default voice channel
            var title = cmd.slice(1, cmd.length).join(" ");
            if (userID == "283927068792717314")
                console.log(voiceChannel.members);
            if (userID in voiceChannel.members) { //Checks if the user is in the same voice channel as the bot
                console.log("title: " + title);
                fuzzySearch(title.toLowerCase(), function(result){
                    if(result){
                        queueObj.path = result['path'];
                        if(queue.findIndex(item => item.path === queueObj.path) === -1){    // not in queue
                            queueObj.user = user;
                            queue.push(queueObj);
                            bot.sendMessage({to:channelID,message: "<@" + userID + ">," + " '" + queueObj.path.slice(0,-4) + "' has been added to the queue"});
                        }else{
                            bot.sendMessage({to:channelID,message: "<@" + userID + ">," + " '" + queueObj.path.slice(0,-4) + "' is already in the queue and was not added"});
                        }
                    }else{
                        bot.sendMessage({to:channelID,message: "<@" + userID + ">, That song could not be found. Please check your spelling or ask iandrewc to add the song."});
                    }
                });
            } else {
                    bot.sendMessage({to:channelID,message: "<@" + userID + ">, You must be in the Red voice channel to queue music."});
                    console.log("User not in Voice Channel");
            }
    }
}

function printQ(msg,channelID){
    var message;
    if(queue.length < 1){
        message = "There are currently no songs in the queue.";
    }else{
        var i;
        message = "The queue is:\n";
        for(i = 0; i < queue.length; i++){
            message = message + (i+1) + ". "+queue[i].path.slice(0,-4) + "\n"
        }
    }
    bot.sendMessage({ to:channelID,
        embed: {
            color: 0xddcaac,
            title: "Currently playing: " + currentSong.slice(0,-4),
            description: message,
            url: "http://redbot.tay.rocks/recent.php",
        }
    });
}

function skip(user){
    console.log(user + " requested the song be skipped");
    stop();
    setTimeout(function(){
        play();
    },2000);
    console.log("Skipping Song");
}

function clear(channelID,userID){
    queue = [];
    bot.sendMessage({to:channelID,message: "<@" + userID + ">, The queue has been cleared."});
}

function dequeue(message,channelID,userID){
    message = message.substring(message.indexOf(" ") + 1).toLowerCase();
    var i;
    for(i = 0; i < queue.length; i++) {
        if(queue[i].path.toLowerCase() == (message + ".mp3") ){
            var removed = queue.splice(i,1)[0].path;
            bot.sendMessage({to:channelID,message: "<@" + userID + ">, " + "'" + removed.slice(0,-4) + "'"  + " has been removed from the queue."});
            return;
        }
    }
    bot.sendMessage({to:channelID,message: "<@" + userID + ">, That song could not be located in the queue."});
}

function addToRecent(song){
    //Adds recently played songs to database
    if(queuedBy != "") {
        db.query("SELECT album FROM music WHERE name = ?",[song], function(err,result) {
            if (err) return console.log(err + " " + result);
            var currentAlbum = result[0]['album'];
            db.query("INSERT INTO recent (name, album, queuedby) VALUES (?,?,?)", [song, currentAlbum, queuedBy]);
        });
    } else {
        db.query("SELECT album FROM music WHERE name = ?",[song], function(err,result) {
            if (err) return console.log(err);
            var currentAlbum = result[0]['album'];
            db.query("INSERT INTO recent (name, album) VALUES (?,?)", [song, currentAlbum]);
        });
    }
}

function recentlyPlayed(channelID){
    var message;
    db.query("SELECT id, name FROM recent WHERE 1 ORDER BY id DESC LIMIT 11", function(err, result)
    {
        var j;
        recentSongs = "";
        for(j = 1; j < result.length; j++){ //starts with song 1 which was the most recent played before current
            recentSongs = recentSongs + j + ". " + result[j]['name'] + "\n"
        }
        bot.sendMessage({ to:channelID,
            embed: {
                color: 0x1c2e6e,
                title: "Currently playing: " + result[0]['name'],
                description: "Recently Played:\n" + recentSongs,
                url: "http://redbot.tay.rocks/recent.php",
            }
        });
    });
}

function rankPlays(channelID,message){
    var listSize = 5;
    var output = "Song Play Count Rankings:\n";
    var args = message.split(" ");
    if(args.length == 2){
        listSize = parseInt(args[1]);
    }
    db.query("SELECT path, SUM(playcount) AS plays FROM music WHERE playcount > 0 GROUP BY path ORDER BY plays DESC LIMIT ?", [listSize], function (err, result) {
        var count = 1;
        result.forEach(function (songs) {
            output = output + count + ". " + songs.path.slice(0,-4) + " - " + songs.plays + " plays\n";
            count++;
        });
        bot.sendMessage({to: channelID, message: output});
    });
}

function playCount(channelID,message,userID) {
    var output = "";
    var title = message.substring(message.indexOf(" ") + 1);
	fuzzySearch(title.toLowerCase(), function(result){
		if(result){
			title = result['name']
			db.query("SELECT SUM(playcount) AS plays FROM music WHERE path = ?", [result.path], function (err, result) {
				output = "'" + title + "' has been played " + result[0].plays + " times.";
				bot.sendMessage({to:channelID,message: "<@" + userID + ">, " + output});    
			});
		}else{
			bot.sendMessage({to:channelID,message: "<@" + userID + ">, That song could not be found"}); 
		}
	});
}

function request(channelID, message, userID, user) {
    var req = message.substring(message.indexOf(" ") + 1);
    db.query("INSERT INTO requested (user, request) VALUES (?,?)", [user,req]);
    bot.sendMessage({to:channelID,message: "<@" + userID + ">, Request submitted."});
}

function tracks(channelID, message, userID, user) {
    var tra = message.substring(message.indexOf(" ") + 1);
    bot.sendMessage({to:channelID,message: "<@" + userID + ">, http://redbot.tay.rocks/redbot.php"});
}

function fuzzySearch(title, callback){
	var result;
	var maxEditDist = 5;
	var minEditDist = maxEditDist;
	db.query("SELECT path,name FROM music", function(err, songList) {
		var i;
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

function editDistance(source, target, callback){
	n = source.length + 1;
	m = target.length + 1;
	var distMatrix = [];
	var min = 0;
	var i,j;
	for(i = 0; i < n; i++){
		distMatrix[i] = [];
	}
	for(i = 0; i < n; i++){
		distMatrix[i][0] = i;
	}
	for(i = 0; i < m; i++){
		distMatrix[0][i] = i;
	}
	for(i = 1; i < n; i++){
		for (j = 1; j < m; j++){
			if(source.charAt(j-1) === target.charAt(i-1)){
				min = distMatrix[i-1][j-1];
			}else{
				min = Math.min(distMatrix[i-1][j-1] + 1, distMatrix[i-1][j] + 1, distMatrix[i][j-1] + 1);

			}
			distMatrix[i][j] = min;
		}
	}
	callback(distMatrix[n-1][m-1]);
}

function time() {
    var date = new Date();
    var time = date.toLocaleString();
    return time;
}
