const { Listener } = require("discord-akairo");
const { db } = require("../../models/db");

class MessageAddListener extends Listener {
    constructor() {
        super("messageAdd", {
            event: "message",
            emitter: "client"
        });
    }

    exec(message) {
        db.query("SELECT * FROM `User` WHERE `userID` = ?", [message.author.id], function (err, result, fields) {
            if (result.length > 0) return
            db.query("INSERT INTO `User` (`userID`) VALUES (?)", [message.author.id])
        })
    }
}

module.exports = MessageAddListener;