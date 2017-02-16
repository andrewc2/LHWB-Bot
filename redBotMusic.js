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

// Announce bot has logged in after connecting to discord, then joining main voice chat and starting playing after 5 sec delay
bot.on('ready', function(event) {
	console.log('Logged in as %s - %s\n', bot.username, bot.id);
	console.log('Joining voice chat and playing after 5 seconds');
	join("", " Red");
	setTimeout(play, 5000);
});

// Automatically reconnect if the bot disconnects from Discord
bot.on('disconnect', function(err, event) {
	console.log('-- Bot Disconnected from Discord with code', event, 'for reason:', err, '--');
	stop();
	setTimeout(bot.connect, 5000);
});

// If bot throws an uncaughtException save error to file and exit
process.on('uncaughtException', (err) => {
  	fs.writeFileSync("red_error_log.txt",JSON.stringify(err));
	process.exit(0);
});

var queue = [];
var queuedBy = "";
var recent = [];

bot.on('message', function(user, userID, channelID, message, event) {

	var cmd = message.split(" ")[0].toLowerCase();
	switch(cmd){
		case "!rjoin":
			if(isMod(channelID,userID))
				join(channelID,message);
			break;
		case "!play":
			if(isMod(channelID,userID))
				setTimeout(play, 5000);
			break;
		case "!stop":
			if(isMod(channelID,userID))
				stop();
			break;
		case "!q":
		case "!queue":
			q(message,channelID,user,userID,cmd);
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
			current(channelID,userID);break;
		case "!recentlyplayed":
			recentlyPlayed(channelID);
			break;
		case "!playcount":
			playCount(channelID, message, userID);
			break;
		case "!rankplays":
			rankPlays(channelID, message, userID);
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
	var channel = message.substring(message.indexOf(" ") + 1);
	var server = bot.channels[channelID].guild_id;
	var channels = bot.servers[server].channels;
	Object.keys(channels).forEach(function(key) {
		if(channels[key].name === channel){
			bot.joinVoiceChannel(channels[key].id, function(){
				console.log("Joined " + channel);
				chan = channels[key].id;
			});
		}
	});
}
function isMod(channelID,userID){
	var bool = false;
	var server = bot.channels[channelID].guild_id;

	if(bot.servers[server] === undefined)
		return bool;

	var roles = bot.servers[server].roles;
	var roleId = "";
	Object.keys(roles).forEach (function(key) {
		if( (roles[key].name === "admins") || (roles[key].name === "mods") ){
			roleId = roles[key].id;
			var userRole = bot.servers[server].members[userID].roles;
			if(userRole.indexOf(roleId) != -1){
				console.log("this guys is totes mod");
				bool = true;
			}
		}
	});
	if (userID === creds.iandrewc){
		console.log("this guys is totes iandrewc");
		bool = true;
	}
	return bool;
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
					//db.query("SELECT path FROM music WHERE type != ? ORDER BY RAND() LIMIT 1",["unreleased"], function(err,result) {
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
					//db.query("SELECT path FROM music WHERE type != ? ORDER BY RAND() LIMIT 1",["unreleased"], function(err,result) {
					//gets path from the music db, and randomly selects a non-unreleased track
						if(result != null) {
							queuedBy = "";
							currentSong = result[0]['path'];
							console.log(currentSong.slice(0,-4) + " is now playing");
							addPlay(currentSong);
							addToRecent(currentSong.slice(0,-4));
							//fs.createReadStream('/home/redbot/music/Viva La Vida.mp3').pipe(stream, {end:false}); new version of playAudioFile
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
		bot.sendMessage({to:channelID,message: "<@" + userID + ">, '" + currentSong.slice(0,-4) + "' is currently playing and was queued by " + queuedBy });
	} else {
		bot.sendMessage({to:channelID,message: "<@" + userID + ">, '" + currentSong.slice(0,-4) + "' is currently playing."});
	}
}

/* The reason for the stopped bool is because stopping the song will emit
 * 'fileEnd' which will automatically play a song.
 */
function stop(){
	bot.getAudioContext(chan, function(err,stream) {
		stopped = true;
		setTimeout(function(){ stream.stopAudioFile();},1000); //new version stream.unpipe()
	});
}

function q(message, channelID, user, userID, cmd){
	queueObj = { };
	if((message.toLowerCase() === "!queue") || (message.toLowerCase() === "!q")){
		printQ(message,channelID);
	}else{
		var title = message.substring(cmd.length + 1);
		console.log("title: " + title);
		fuzzySearch(title.toLowerCase(), function(result){
			if(result){
				queueObj.path = result['path'];
				if(queue.findIndex(item => item.path === queueObj.path) === -1){	// not in queue
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
	}
}

function printQ(msg,channelID){
	var message;
	if(queue.length < 1){
		message = "There are currently no songs in the queue.";
	}else{
		var i;
		message = "'" + currentSong.slice(0,-4) + "'"  + " is currently playing.\n\n" + "The queue is:\n";
		for(i = 0; i < queue.length; i++){
			message = message + (i+1) + ". "+queue[i].path.slice(0,-4) + "\n"
		}
	}
	bot.sendMessage({to: channelID, message: message});
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
	if(recent.length > 11) {
		recent.shift();
		recent.push(song);
	} else {
		recent.push(song);
	}
}
function recentlyPlayed(channelID){
	var message;
	if(recent.length < 1){
		message = "There are currently no recently played songs.";
	}else{
		var i,j;
		message = "'" + currentSong.slice(0,-4) + "'"  + " is currently playing.\n\n" + "The recently played songs are:\n";
		for(i = recent.length - 2, j = 1; i > 0; i--, j++){
			message = message + j + ". " + recent[i] + "\n"
		}
	}
	bot.sendMessage({to: channelID, message: message});
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
