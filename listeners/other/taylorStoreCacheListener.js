const { Listener } = require('discord-akairo');
const { Events } = require('discord.js');
const { UnitedStatesStore, UnitedKingdomStore, AustraliaStore, CanadaStore } = require('../../utilities/taylorStore');

module.exports = class TaylorStoreCacheListener extends Listener {
  constructor() {
    super('taylorStoreCacheListener', {
      event: Events.ClientReady,
      category: 'other',
      emitter: 'client',
    });
  }

  async exec() {
    await UnitedStatesStore(this.client).cache();
    await UnitedKingdomStore(this.client).cache();
    await AustraliaStore(this.client).cache();
    await CanadaStore(this.client).cache();
  }
};
