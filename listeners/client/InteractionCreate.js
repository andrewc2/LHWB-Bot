import Listener from '../../structure/listeners/Listener.js';
import { Events } from 'discord.js';
import { database } from '../../models/database.js';

export default class InteractionCreate extends Listener {
  constructor() {
    super('interactionCreate', {
      emitter: 'client',
      category: 'client',
      event: Events.InteractionCreate,
    });
  }

  exec(interaction) {
    database.query('SELECT * FROM user WHERE `userID` = ?', [interaction.user.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return database.query('INSERT INTO user (`userID`) VALUES (?)', [interaction.user.id]);
    });
  }
}
