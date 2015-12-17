var DiscordClient = require('discord.io');
var fs = require('fs');

var bot = new DiscordClient({
	email: "",
	password: "",
	autorun: true
});

bot.on('ready', function() {
    console.log(bot.username + " - (" + bot.id + ")");
});


var songs = [];
var names = [];
var queue = [];

fillArrays();

var chan ="";
var mods = [];

bot.on('message', function(user, userID, channelID, message, rawEvent) {
	var cmd = message.split(" ")[0].toLowerCase();
	switch(cmd){
		case "!join":
			if(mods.indexOf(user) > -1)
				join();
			break;
		case "!play":
			if(mods.indexOf(user) > -1)
				play();
			break;
		case "!stop":
			if(mods.indexOf(user) > -1)
				stop();
			break;
		case "!queue":
			q(message,channelID,user,userID,cmd);break;
		case "!skip":
			skip(user);break;
		case "!clearqueue":
			clear(user);break;
		case "!current":
			current(channelID);break;
		case "!q":
			q(message,channelID,user,userID,cmd);break;
		case "!updatesonglist":
			if(user === mods[0])
				update(message);
			break;
		default:
	}	
});

var stopped = false;
function join(){
	bot.joinVoiceChannel(chan, function(){
		console.log("joined");
	});

}

var currentSong;
function play(){
	stopped = false;
	var rand;
	bot.testAudio({ channel:chan , stereo: true}, function(stream) {
		if(queue.length > 0){
			var temp = queue.shift();
			if(temp === "Random.mp3"){
				rand = Math.floor(Math.random()*(100));
				currentSong = names[rand];
				stream.playAudioFile('../music/' + songs[rand]);
				console.log(songs[rand] + " is now playing");

			}else{
				currentSong = names[songs.indexOf(temp)];
				stream.playAudioFile('../music/' + temp);
				console.log(temp + " is now playing");
			}
		}else{
			rand = Math.floor(Math.random()*(100));
			currentSong = names[rand];
			stream.playAudioFile('../music/' + songs[rand]);
			console.log(songs[rand] + " is now playing");
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
function current(channelID){
	bot.sendMessage({to:channelID,message: currentSong + ", is currently playing."});
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
	if((message === "!queue") || (message === "!q")){
		printQ(message,channelID);
	}else{	
		var title = message.substring(cmd.length + 1).toLowerCase();
		console.log("title: " + title);
		var index = names.indexOf(title);
		if(index  > -1){
			if(queue.indexOf(songs[index]) === -1){
				queue.push(songs[index]);
				bot.sendMessage({to:channelID,message: "<@" + userID + ">, " + songs[index].slice(0,-4) + " has been added to the queue."});
			}else{
				bot.sendMessage({to:channelID,message: "<@" + userID + ">, " + songs[index].slice(0,-4) + " is already in the queue and will not be added."});
			}
		}else{
			if(title === "random"){
				queue.push("Random.mp3");
			}else{
				bot.sendMessage({to:channelID,message: "<@" + userID + ">, That song could not be found. Please check your spelling or ask Historicc to add the song."});
			}
		}
	}
}	

function printQ(msg,channelID){
	var message;
	if(queue.length < 1){
		message = "There are currently no songs in the queue.";
	}else{
		var i;
		message = "The current song queue is:\n";
		for(i = 0; i < queue.length; i++){
			message = message + (i+1) + ". "+queue[i].slice(0,-4) + "\n"
		}
	}	
	bot.sendMessage({to: channelID, message: message});
}	

function skip(user){
	console.log(user);	
	if(mods.indexOf(user) > -1){
		stop();
		setTimeout(function(){
			play();
		},2000);
		console.log("skipped");
	}
}


function clear(user){
	if(mods.indexOf(user) > -1){
		queue = [];
		console.log("queue has been cleared");
	}
}

/* Currently using text files to store song list. Will probably change that once i have more time */
function fillArrays(){
	fs.readFile("Songs.txt",function(err, data){
		if(err) throw err;
		songs = data.toString().split("\n");
	});
	fs.readFile("names.txt",function(err, data){
		if(err) throw err;
		names = data.toString().toLowerCase().split("\n");
	});
}

function update(message){
	var index = message.indexOf(" ");
	var title = message.substring(index + 1);
	fs.appendFile("Songs.txt", "\n" + title + ".mp3", function (err) {
		if (err) throw err;
		console.log("Updated");
	});
	fs.appendFile("names.txt", "\n" + title, function (err) {
		if (err) throw err;
		console.log("Updated");
	});
	songs = [];
	names = [];
	fillArrays();
}








