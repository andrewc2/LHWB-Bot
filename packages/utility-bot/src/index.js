import { Utilities } from '@lhwb/shared';

import UtilityBotClient from './client/UtilityBotClient.js';

const config = await Utilities.loadJSON('config.json');

const client = new UtilityBotClient(config);

void client.start();
