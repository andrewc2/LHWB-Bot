import { ConfigInterface, Utilities } from '@lhwb/shared';

import MusicBotClient from './client/MusicBotClient.js';

const config = (await Utilities.loadJSON('config.json')) as ConfigInterface;

const client = new MusicBotClient(config);

void client.start();
