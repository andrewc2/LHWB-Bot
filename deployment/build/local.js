/* eslint-disable no-console */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { REST, Routes } from 'discord.js';

import { combine } from './combine.js';
import { loadJSON } from './utils.js';

const config = await loadJSON('config.json');

try {
  const clientId = config['discord']['client_id'];
  const token = config.discord.token;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const music = join(__dirname, '..', 'commands/music');
  const utility = join(__dirname, '..', 'commands/utility');
  const limited = join(__dirname, '..', 'commands/limited');

  const musicJson = await combine(music);
  const utilityJson = await combine(utility);
  const limitedJson = await combine(limited);

  const commands = [
    ...Object.values(musicJson),
    ...Object.values(utilityJson),
    ...Object.values(limitedJson),
  ];

  const rest = new REST().setToken(token);
  const data = await rest.put(Routes.applicationCommands(clientId), {
    body: commands,
  });

  console.log(`Deployed ${data.length} commands`);
} catch (e) {
  console.error(e);
}
