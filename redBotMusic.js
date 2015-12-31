var DiscordClient = require('discord.io');
var fs = require('fs');
var creds = require('../auth.json');
var mysql = require('mysql');
var db = mysql.createConnection({
	host: creds.mysqlHost,
	user: creds.mysqlUser,
	password: creds.mysqlPassword,
	database: creds.database
});
var bot = new DiscordClient({
	email: creds.email,
	password: creds.password,
	autorun: true
});

bot.on('ready', function() {
    console.log(bot.username + " - (" + bot.id + ")");
});


var queue = [];
var queuedBy = "";
var recent = [];

bot.on('message', function(user, userID, channelID, message, rawEvent) {
	
	var cmd = message.split(" ")[0].toLowerCase();
	switch(cmd){
		case "!join":
			if(isMod(channelID,userID))
				join(channelID,message);
			break;
		case "!play":
			if(isMod(channelID,userID))
				play();
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
		case "!redbotrequest":
			request(channelID, message, userID,user);
			break;
		default:
	}	
});
function join(channelID,message){
	var channel = message.substring(message.indexOf(" ") + 1);
	var server = bot.serverFromChannel(channelID);
	var channels = bot.servers[server].channels;
	Object.keys(channels).forEach(function(key) {
		if(channels[key].name === channel){
			bot.joinVoiceChannel(channels[key].id, function(){
				console.log("joined");
				chan = channels[key].id;
			});
		}
	});
}
function isMod(channelID,userID){
	var bool = false;
	var server = bot.serverFromChannel(channelID);

    if(bot.servers[server] === undefined)
        return bool;

	var roles = bot.servers[server].roles;
	var roleId = "";
	Object.keys(roles).forEach (function(key) {
		if( (roles[key].name === "chat mods") || (roles[key].name === "admins") ){
			roleId = roles[key].id;
			var userRole = bot.servers[server].members[userID].roles;
			if(userRole.indexOf(roleId) != -1){
				console.log("this guys is totes mod");
				bool = true;
			}
		}
	});
	return bool;
	
}
var stopped = false;


var currentSong;
function play(){
	stopped = false;
	var rand;
	bot.testAudio({ channel:chan , stereo: true}, function(stream) {
		if(queue.length > 0){
			console.log("test");
			var temp = queue.shift();
			if(temp === "Random.mp3"){
				db.query("SELECT path FROM music WHERE type != ? ORDER BY RAND() LIMIT 1",["unreleased"], function(err,result) {
					if(result != null) {
						queuedBy = temp.user;
						currentSong = result[0]['path'];
						console.log(currentSong.slice(0,-4) + " is now playing");
						addPlay(currentSong);
						addToRecent(currentSong.slice(0,-4));
						stream.playAudioFile('../music/' + currentSong);
					}
				});

			}else{
				currentSong = temp.path;
				queuedBy = temp.user;
				console.log(queuedBy);
				addPlay(currentSong);
				addToRecent(currentSong.slice(0,-4));
				stream.playAudioFile('../music/' + currentSong);
				console.log(currentSong.slice(0,-4) + " is now playing");
			}
		}else{
			db.query("SELECT path FROM music WHERE type != ? ORDER BY RAND() LIMIT 1",["unreleased"], function(err,result) {
				if(result != null) {
					queuedBy = "";
					currentSong = result[0]['path'];
					console.log(currentSong.slice(0,-4) + " is now playing");
					addPlay(currentSong);
					addToRecent(currentSong.slice(0,-4));
					stream.playAudioFile('../music/' + currentSong);
				}
			});
		}	
		stream.once('fileEnd',function(){
			if(!stopped){
				setTimeout(function(){
					play();
				}, 2000);
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

/* The reason for the stopped bool is because stoping the song will emit 
 * 'fileEnd' which will automatically play a song.
 */
function stop(){
	 bot.testAudio({ channel:chan , stereo: true}, function(stream) {
		stopped = true;
		setTimeout(function(){ stream.stopAudioFile();},1000);
	});
}

function q(message, channelID, user, userID, cmd){
	queueObj = { };
	if((message.toLowerCase() === "!queue") || (message.toLowerCase() === "!q")){
		printQ(message,channelID);
	}else{	
		var title = message.substring(cmd.length + 1);
		console.log("title: " + title);
		db.query("SELECT path FROM music WHERE name = ?", [title], function (err, result) {
			if(result[0] != null) {
				queueObj.path = result[0]['path'];
				queueObj.user = user;
				queue.push(queueObj);
				bot.sendMessage({to:channelID,message: "<@" + userID + ">," + " '" + queueObj.path.slice(0,-4) + "' has been added to the queue"});	
			}else{
				bot.sendMessage({to:channelID,message: "<@" + userID + ">, That song could not be found. Please check your spelling or ask Historicc to add the song."});	
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
	console.log(user);	
	stop();
	setTimeout(function(){
		play();
	},2000);
	console.log("skipped");
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
	db.query("SELECT path FROM music WHERE name = ?", [title], function (err, result) {	
		if(result[0] != null){
			db.query("SELECT SUM(playcount) AS plays FROM music WHERE path = ?", [result[0].path], function (err, result) {
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
