//Constructor
function Poll() {
	this.poll = {
		"active":false,
		"timer":0,
		"endTime":0,
		"timeLeft":0,
		"options":[],
		"optionsNum":[],
		"text":[],
		"creator":"",
		"res":[],
		"users":[],
		"votes":0
	};
}
Poll.prototype.pollCommand = function(msg, isMod) {
	var returnText;
	//Need this long if to prevent unessecary polls
	if((!this.poll["active"] && msg.content.substring(5) != "") || (!this.poll["active"] && msg.content.substring(6) != "")) {	
		this.poll["timer"] = new Date().getTime();
		//console.log("poll timer: "+this.poll["timer"]);
		this.poll["options"] = msg.content.substring(5).split(",");
		this.poll["optionsNum"] = this.poll["options"].length;
		this.poll["text"] = "A poll has been started by " + msg.author + " please enter a number. Type '!poll' to close.";

		for(var i = 1; i < this.poll["optionsNum"] + 1; i++) {
			this.poll["text"] += "\n" + i + ". ";
			this.poll["text"] += this.poll["options"][i-1];
		}
		
		returnText = this.poll["text"]
		
		this.poll["active"] = true;
		this.poll["channel"] = msg.channel;
		this.poll["creator"] = msg.author;
		
		for(var i = 0; i < this.poll["optionsNum"]; i++) {
			this.poll["res"][i] = 0;
		}
	} else if(this.poll["active"]) {
		this.poll["endTime"] = new Date().getTime();
		//console.log(this.poll["endTime"] - this.poll["timer"]);
		if(msg.content.split(" ").length > 1) {
			returnText =  "A poll is already active on this server. Close the previous poll with '!poll' and try again";
		} else if((msg.author == this.poll["creator"]) || ((this.poll["endTime"] - this.poll["timer"]) > 120000) || isMod) {
			returnText = this.closePoll();
		} else {
			this.poll["timeLeft"] = 120 - ((this.poll["endTime"] - this.poll["timer"]) / 1000);
			returnText =  "this poll needs to be closed by " + this.poll["creator"].username + " or by anyone in " + this.poll["timeLeft"] + " seconds.";
		}
	} else {
		returnText = "No poll is active, start a poll by typing !poll <option1>, <option2>, <option3>...";
	}
	return returnText;
}
Poll.prototype.closePoll = function() {
	this.poll["text"] = "--------------------------" + "\n" + "The poll is now closed" + "\n" + "--------------------------" + "\n";
	if(this.poll["votes"] === 0) {
		this.poll["text"] += "There were no votes for this poll\n";
	} else {
		for(i = 1 ; i < this.poll["optionsNum"] + 1; i++) {
			this.poll["text"] += Math.round(this.poll["res"][i-1]/this.poll["votes"]*100);
			if((this.poll["res"][i-1]/this.poll["votes"]*100) < 10) {
				this.poll["text"] += "%\t\t\t"
			}
			if((this.poll["res"][i-1]/this.poll["votes"]*100) === 100) {
				this.poll["text"] += "%\t\t"
			}
			if(((this.poll["res"][i-1]/this.poll["votes"]*100) < 100) && ((this.poll["res"][i-1]/this.poll["votes"]*100) >= 10)) {
				this.poll["text"] += "%\t\t\t"
			}
			if(this.poll["res"][i-1] === 1) {
				this.poll["text"] += this.poll["options"][i-1] + "(" + this.poll["res"][i-1] + " vote)" +"\n";
			} else {
				this.poll["text"] += this.poll["options"][i-1] + "(" + this.poll["res"][i-1] + " votes)" +"\n";
			}
			
		}
	}
	var retrunText = this.poll["text"] + "--------------------------";
	
	//Reset poll array
	this.poll = {
		"active":false,
		"timer":0,
		"endTime":0,
		"timeLeft":0,
		"options":[],
		"optionsNum":[],
		"text":[],
		"creator":"",
		"res":[],
		"users":[],
		"votes":0
	};
	return retrunText;
}
Poll.prototype.vote = function(msg) {
	if(msg.channel === this.poll["channel"]) {
		if((parseInt(msg.content) < (this.poll["optionsNum"] + 1)) && (this.poll["users"].indexOf(msg.author) < 0) && ((parseInt(msg.content) != 0))) {
			this.poll["res"][parseInt(msg.content) - 1]++;
			this.poll["users"].push(msg.author);
			this.poll["votes"]++;	
		}
	}
} 

// export class
module.exports = Poll;