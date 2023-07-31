const { TaylorStoreAutoPoster } = require('./taylorStoreAutoPoster');
const { store_autopost } = require('../config.json');

const UnitedStatesStore = (client) => new TaylorStoreAutoPoster(client, 'US', 'https://store.taylorswift.com', store_autopost.us_store.channel_id, store_autopost.us_store.role_id);
const UnitedKingdomStore = (client) => new TaylorStoreAutoPoster(client, 'UK', 'https://storeuk.taylorswift.com', store_autopost.uk_store.channel_id, store_autopost.uk_store.role_id);
const AustraliaStore = (client) => new TaylorStoreAutoPoster(client, 'AU', 'https://storeau.taylorswift.com', store_autopost.au_store.channel_id, store_autopost.au_store.role_id);
const CanadaStore = (client) => new TaylorStoreAutoPoster(client, 'CA', 'https://storeca.taylorswift.com', store_autopost.ca_store.channel_id, store_autopost.ca_store.role_id);

module.exports = { UnitedStatesStore, UnitedKingdomStore, AustraliaStore, CanadaStore };