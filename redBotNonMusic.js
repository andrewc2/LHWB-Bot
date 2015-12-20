var Discord = require('discord.js');
var giphy = require('apigiphy');
var fs = require('fs');
var gifs;
var mybot = new Discord.Client();
giphy = giphy({api_key:'dc6zaTOxFJmzC'});

mybot.on("ready", function(){
	console.log("Ready to begin! Serving in " + mybot.channels.length + " channels");
});



fs.readFile('ts', function(err, data) {
    if(err) throw err;
    gifs = data.toString().split("\n");
});



mybot.login("","");
mybot.on("message", function(msg){
	var args = msg.content.split(" ");
	
	switch (args[0]){
		case "!gif":
			gif(msg);break;
		case "!celcius":
			celsius(msg);break;
		case "!c":
			celsius(msg);break;
		case "!farenheit":
			farenheit(msg);break;
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
			poll(msg);break;
		default:
			if(isPoll)
				vote(msg);
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

function checkTable(msg){
	var table = "\t┬─┬ノ(ಠ_ಠノ)";
	var t = msg.content.toLowerCase().indexOf("┻"); 
	if(t > -1 && msg.content.toLowerCase().substring(t).indexOf("┻") > -1){
		mybot.reply(msg, table);
		addFlip();
	}else if(msg.content.toLowerCase().indexOf("╝") > -1){
		mybot.reply(msg, table);
		addFlip();
	}else if(msg.content.toLowerCase().indexOf("╘") > -1){
		mybot.reply(msg, table);
		addFlip();
	}else if(msg.content.toLowerCase().indexOf("╙") > -1){
		mybot.reply(msg, table);
		addFlip();
	}else if(msg.content.toLowerCase().indexOf("╨") > -1){
		mybot.reply(msg, table);
		addFlip();
	}else if(msg.content.toLowerCase().indexOf("└") > -1){
		mybot.reply(msg, table);
		addFlip();
	}

}

function addFlip(){
	var flips = parseInt(fs.readFileSync('flips','utf8'));
	flips = flips + 1;
	fs.writeFile('flips',flips,function(err){
		if(err)throw err;
	});
}

/* Poll Variables */
var isPoll = false;
var pollTimer = 0;
var endTime = 0;
var pollOptions;
var numOptions;
var pollChannel;
var pollText;
var pollCreator;
var pollRes = [];
var pollUsers = [];
var votes = 0;
var timeLeft;

function poll(msg){
	//Create poll
	if(!isPoll){	
		pollTimer = new Date().getTime();
		console.log(pollTimer);
		console.log("poll timer: " + new Date().getTime());
		pollOptions = msg.content.substring(5).split(",");
		numOptions = pollOptions.length;
		pollText = "A poll has been started by " + msg.author + " please enter a number. Type '!poll' to close.";

		var i;
		for(i = 1; i < numOptions + 1; i++){
			pollText = pollText + "\n" + i + ". ";
			pollText = pollText + pollOptions[i-1];
		}
		
		mybot.sendMessage(msg.channel,pollText);
		
		isPoll = true;
		pollChannel = msg.channel;
		pollCreator = msg.author;
		
		for(i = 0; i < numOptions; i++){
			pollRes[i] = 0;
		}
	}else{
		endTime = new Date().getTime();
		console.log(endTime - pollTimer);
		if(msg.content.split(" ").length > 1){
			mybot.reply(msg, "A poll is already active on this server. Close the previous poll with '!poll' and try again");
		}else if((msg.author == pollCreator) || ((endTime - pollTimer) > 120000) || (msg.author.username === "Historicc")){
			closePoll();
		} else {
			timeLeft = 120 - ((endTime - pollTimer) / 1000);
			mybot.reply(msg, "this poll needs to be closed by " + pollCreator.username + " or by anyone in " + timeLeft + " seconds.");
		}

	}
}
function vote(msg){
	if(msg.channel === pollChannel){
		if((parseInt(msg.content) < (numOptions + 1)) && (pollUsers.indexOf(msg.author) < 0) && ((parseInt(msg.content) != 0))){
			pollRes[parseInt(msg.content) - 1]++;
			pollUsers.push(msg.author);
			votes++;	
		}
	}
}

function closePoll(){
	pollText = "--------------------------" + "\n" + "The poll is now closed" + "\n" + "--------------------------" + "\n";
	if(votes === 0){
		pollText = pollText + "There were no votes for this poll\n";
	}else{
		for(i = 1 ; i < numOptions + 1; i++){
			pollText = pollText + Math.round(pollRes[i-1]/votes*100);
			if((pollRes[i-1]/votes*100) < 10){
				pollText = pollText + "%\t\t\t"
			}
			if((pollRes[i-1]/votes*100) === 100){
				pollText = pollText + "%\t\t"
			}
			if(((pollRes[i-1]/votes*100) < 100) && ((pollRes[i-1]/votes*100) >= 10)){
				pollText = pollText + "%\t\t\t"
			}
			if(pollRes[i-1] === 1){
				pollText = pollText + pollOptions[i-1] + "(" + pollRes[i-1] + " vote)" +"\n";
			}else{
				pollText = pollText + pollOptions[i-1] + "(" + pollRes[i-1] + " votes)" +"\n";
			}
			
		}
	}
	pollText = pollText + "--------------------------";
		mybot.sendMessage(pollChannel,pollText);
		clearPoll();
}

function clearPoll(){
	pollOptions = [];
	numOptions = 0;
	pollRes = [];
	isPoll = false;
	pollUsers = [];
	pollCreator = "";
	votes = 0;
	pollTimer = 0;
	pollChannel = null;
	endTime = 0;
}






