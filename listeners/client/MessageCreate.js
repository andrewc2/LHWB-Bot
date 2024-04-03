import Listener from '../../structure/listeners/Listener.js';
import { Events } from 'discord.js';
import { database } from '../../models/database.js';

export default class MessageCreate extends Listener {
  constructor() {
    super('messageCreate', {
      emitter: 'client',
      category: 'client',
      event: Events.MessageCreate,
    });
  }

  exec(message) {
    database.query('SELECT * FROM user WHERE `userID` = ?', [message.author.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return database.query('INSERT INTO user (`userID`) VALUES (?)', [message.author.id]);
    });
  }
}
