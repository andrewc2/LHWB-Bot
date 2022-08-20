const { Listener } = require('discord-akairo');
const { Events } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class MessageAddListener extends Listener {
  constructor() {
    super('messageAdd', {
      emitter: 'client',
      category: 'client',
      event: Events.MessageCreate,
    });
  }

  exec(message) {
    db.query('SELECT * FROM `User` WHERE `userID` = ?', [message.author.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return db.query('INSERT INTO `User` (`userID`) VALUES (?)', [message.author.id]);
    });
  }
};
