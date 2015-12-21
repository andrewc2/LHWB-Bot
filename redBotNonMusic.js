var Discord = require('discord.js');
var giphy = require('apigiphy');
var fs = require('fs');
var gifs;
var mybot = new Discord.Client();
var Poll = require('./polls.js');
var polls = [];
giphy = giphy({api_key:'dc6zaTOxFJmzC'});
var serverid = 115332333745340416;

mybot.on("ready", function(){
	console.log("Ready to begin! Serving in " + mybot.channels.length + " channels");
});

fs.readFile('ts', function(err, data) {
    if(err) throw err;
    gifs = data.toString().split("\n");
});

var creds = require("../auth.json");
mybot.login(creds.email, creds.password);

mybot.on("message", function(msg) {
	//This bot is for a specific server
	if(msg.channel.server.id != serverid)
		return;


	var args = msg.content.split(" ");
	switch (args[0].toLowerCase()) {
		case "!gif":
			gif(msg);break;
		case "!celcius":
		case "!c":
			celsius(msg);break;
		case "!farenheit":
		case "!f":
			farenheit(msg);break;
		case "!kanye":
			kanye(msg);break;
		case "!olivia":
			olivia(msg);break;
		case "!meredith":
			meredith(msg);break;
		case "!hhelp":
			hhelp(msg);break;
		case "!2am":
		case "!twoam":
			twoAM(msg);break;
		case "!rip":
			rip(msg);break;
		case "!spam":
			spam(msg);break;
		case "!upvote":
			upvote(msg);break;
		case "!jelly":
			jelly(msg);break;
		case "!tablesrespected":
			tablesrespected(msg);break;
		case "!poll":
			if(polls[msg.channel.id] != undefined) {
				mybot.sendMessage(msg.channel, polls[msg.channel.id].pollCommand(msg, isMod(msg.channel.server, msg.author)));
			} else {
				polls[msg.channel.id] = new Poll();
				mybot.sendMessage(msg.channel, polls[msg.channel.id].pollCommand(msg, isMod(msg.channel.server, msg.author)));
			}break;
		default:
			if(polls[msg.channel.id] != undefined && polls[msg.channel.id].poll["active"])
				polls[msg.channel.id].vote(msg);
			checkTable(msg);
	}
});


function gif(msg){
	var args = msg.content.split(" ");
	var len = gifs.length;
	var random;

	if(args.length === 1){
		random = Math.floor(Math.random()*len);	
		mybot.sendMessage(msg.channel, "http://i.imgur.com/" + gifs[random] + "\n#" + random + " beep boop");
	}else if (parseInt(args[1]) < len + 1){
		mybot.sendMessage(msg.channel, "http://i.imgur.com/" + gifs[parseInt(args[1])] + "\n#" + args[1] + " beep boop");
	}else{
		giphy.search({q:"taylor swift " + msg.content.substring(5)})
		 .then(function(response){
		  		if(response.data.length === 0){
			  		mybot.reply(msg, "Search returned no results");
		  		}else{
		 			rand = Math.floor(Math.random()*response.data.length);
		  			mybot.sendMessage(msg.channel, response.data[rand].url);
				}
			}, function(error){
		  		console.log(error);  
			});
	}
}

function celsius(msg){
	var f = parseFloat(msg.content.substring(msg.content.indexOf(' ')+1));
	var c = (5/9)*(f - 32);
	mybot.reply(msg, Number(c.toFixed(1)));
}

function farenheit(msg){
	var c = parseFloat(msg.content.substring(msg.content.indexOf(' ')+1));
	var f = (9/5)*c + 32;
	mybot.reply(msg, Number(f.toFixed(1)));
}

function kanye(msg){
	mybot.sendMessage(msg.channel, "http://i.imgur.com/SXdC0AF.png");
}

function olivia(msg){
	mybot.sendMessage(msg.channel, "http://www.eonline.com/eol_images/Entire_Site/201492/rs_560x368-141002154506-1024.olivia-benson-keds.jpg");
}

function meredith(msg){
	mybot.sendMessage(msg.channel, "http://i.imgur.com/qrfeiAN.png");
}

function penis(msg){
	mybot.sendMessage(msg.channel, "http://i.imgur.com/Ad5O21v.png");
}

function hhelp(msg){
	mybot.sendMessage(msg.channel, "Beep Boop bop\n"
		+"---------------------\n"
		+"!poll [option 1],[option 2],[option 3]\n"
		+"gif : Displays a random gif\n"
		+"gif [number] : Displays a gif that corresponds to the number\n"
		+"kanye : Imma let you finish\n"
		+"2am : A playlist of songs that reference 2am\n"
		+"f [celcius] : Converts input to Farenheit\n"
		+"c [farenheit] : Converts input to Celsius\n"
		+"upvote\n"
		+"rip : rip in piece\n"
		+"meredith\n"
		+"olivia\n"
		+"jelly : Jelly school diploma\nPlease respect tables.");
}
function rip(msg){
	mybot.sendMessage(msg.channel, "http://i.imgur.com/nL6tQLj.gif");
}
function twoAM(msg){
	mybot.sendMessage(msg.channel, "The 2am playlist\n"
		+"---------------------\n"
		+"Enchanted\n"
		+"Mine\n"
		+"Mary's Song (Oh My My My)\n"
		+"The Way I Loved You\n"
		+"Breathe\n"
		+"I Wish You Would\n"
		+"Last Kiss");
}

function spam(msg){
	mybot.sendMessage(msg.channel, "http://i.imgur.com/ae91blN.png");
}

function upvote(msg){
	mybot.sendMessage(msg.channel, "http://i.imgur.com/H41gR8K.gif");
}

function jelly(msg){
	mybot.sendMessage(msg.channel, "http://jelly-school.com/i/IPpkYx.png");
}

function tablesrespected(msg){
	mybot.reply(msg,parseInt(fs.readFileSync('flips','utf8')) + " tables have been respected");
}

function checkTable(msg) {
	var table = "\t┬─┬ノ(ಠ_ಠノ)";
	var t = msg.content.toLowerCase().indexOf("┻"); 
	var differentTableLegs = ["┻", "╝","╘","╙","╨","└"];
	for(var i = 0;i< differentTableLegs.length;i++) {
		if(msg.content.toLowerCase().indexOf(differentTableLegs[i]) > -1) {
			mybot.reply(msg, table);
			addFlip();
			break;
		}
	}
}
function addFlip() {
	var flips = parseInt(fs.readFileSync('flips','utf8'));
	flips++;
	fs.writeFile('flips',flips,function(err){
		if(err)throw err;
	});
}
function inRole(server, user, needle) {
    var roles = server.rolesOfUser(user);
    var inRole = false;
    roles.forEach(function (role) {
        if (role.name == needle) {
            inRole = true;
        }
    });
    return inRole;
}
function isMod(server, user) {
    return inRole(server, user, "admins") || inRole(server, user, "chat mods") || inRole(server, user, "supreme leader");
}
