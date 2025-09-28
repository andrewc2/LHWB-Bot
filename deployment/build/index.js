import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import * as core from '@actions/core';
import { REST, Routes } from 'discord.js';

import { combine } from './combine.js';

try {
  const clientId = core.getInput('client-id');
  const token = core.getInput('token');
  const limitedServersInput = core.getInput('limited-servers');
  const musicServersInput = core.getInput('music-servers');
  const dryRun = core.getInput('dry-run') === 'true';

  const limitedServers = limitedServersInput
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const musicServers = musicServersInput
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const music = join(__dirname, '..', '..', 'commands/music');
  const utility = join(__dirname, '..', '..', 'commands/utility');
  const limited = join(__dirname, '..', '..', 'commands/limited');

  const musicJson = await combine(music);
  const utilityJson = await combine(utility);
  const limitedJson = await combine(limited);

  if (dryRun) {
    const commands = [
      ...Object.values(musicJson),
      ...Object.values(utilityJson),
      ...Object.values(limitedJson),
    ];

    core.info('Dry run: skipping actual API call.');
    core.info(`Would deploy ${commands.length} commands:`);
    core.info(JSON.stringify(commands, null, 2));

    core.setOutput(
      'response',
      `dry run - would deploy ${commands.length} commands`,
    );
    process.exit(0);
  }

  const rest = new REST().setToken(token);

  // 1. Deploy utility commands globally
  core.info('Deploying utility commands globally...');
  const globalResponse = await rest.put(Routes.applicationCommands(clientId), {
    body: Object.values(utilityJson),
  });
  core.info(`Global commands deployed: ${globalResponse.length}`);

  // 2. Deploy limited commands to limited servers
  for (const guildId of limitedServers) {
    const combinedCommands = [...Object.values(limitedJson)];

    if (musicServers.includes(guildId)) {
      core.info(`Combining limited and music commands for ${guildId}...`);
      combinedCommands.push(...Object.values(musicJson));
    }

    core.info(`Deploying limited commands to guild ${guildId}...`);
    const response = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      {
        body: combinedCommands,
      },
    );
    core.info(`Deployed ${response.length} commands to guild ${guildId}`);
  }

  // 3. Deploy music commands to music servers that are not limited
  for (const guildId of musicServers) {
    if (!limitedServers.includes(guildId)) {
      core.info(`Deploying music commands to guild ${guildId}...`);
      const response = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: Object.values(musicJson) },
      );
      core.info(`Deployed ${response.length} commands to guild ${guildId}`);
    }
  }

  core.setOutput('response', 'Commands deployed successfully!');
} catch (e) {
  core.setFailed(e.message);
}
