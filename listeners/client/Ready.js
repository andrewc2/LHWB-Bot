import Listener from '../../structure/listeners/Listener.js';
import { ActivityType, Events } from 'discord.js';
import { TimerBasedCronScheduler as scheduler } from 'cron-schedule/schedulers/timer-based.js';
import { parseCronExpression } from 'cron-schedule';
import Logger from '../../utilities/Logger.js';
import Utilities from '../../utilities/Utilities.js';

export default class Ready extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      category: 'client',
      event: Events.ClientReady,
    });
  }

  async exec() {
    this.client.apiCommands = await this.client.application.commands.fetch();
    this.client.user.setActivity('Music', { type: ActivityType.Listening });

    const stores = this.client.stores;
    stores.forEach((store) => store.cache());
    setInterval(() => Utilities.fastFetchStore(stores), 10000);
    setInterval(() => Utilities.slowFetchStore(stores), 30000);

    scheduler.setInterval(
      parseCronExpression('*/30 * * * *'),
      () => this.client.cart.clear(),
    );

    scheduler.setInterval(
      parseCronExpression('*/2 * * * *'),
      () => Utilities.enableStores(stores),
    );

    Logger.info(`Logged in as ${this.client.user.tag} (${this.client.user.id})`);
  }
}
