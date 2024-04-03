import Listener from '../../structure/listeners/Listener.js';
import { Events } from 'discord.js';
import { database } from '../../models/database.js';

export default class DeleteSpamChannelOnChannelDelete extends Listener {
  constructor() {
    super('deleteSpamChannelOnChannelDelete', {
      event: Events.ChannelDelete,
      emitter: 'client',
      category: 'permissions',
    });
  }

  exec(channel) {
    if (!channel.guild) return;
    database.query('DELETE FROM permissions WHERE channel_id = ?', [channel.id]);
  }
}
