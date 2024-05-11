import { dirname, join, extname, resolve } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { ApplicationCommandOptionType, Collection, PermissionsBitField, REST, Routes } from 'discord.js';
import Handler from './structure/Handler.js';
import Command from './structure/commands/Command.js';
import Logger from './utilities/Logger.js';
import Utilities from './utilities/Utilities.js';
const config = await Utilities.loadJSON('../config.json');
const voiceServers = await Utilities.loadJSON('../voice-servers.json');

const path = join(dirname(fileURLToPath(import.meta.url)), '.', 'commands');
const clientId = config.command_deployment.client_id;
const limitedServers = config.command_deployment.limited_guilds;
let musicServers = voiceServers.map((server) => server.guild_id);

const rest = new REST({ version: '10' }).setToken(config.discord.discord_token);

const load = async (thing) => {
  const modules = new Collection();
  const isClass = typeof thing === 'function';
  const extensions = ['.js', '.json', '.ts'];

  if (!isClass && !extensions.includes(extname(thing))) {
    return undefined;
  }

  let mod = isClass
    ? thing
    : function findExport(m) {
      if (!m) return null;
      if (m.prototype instanceof Command) return m;
      return m.default ? findExport.call(this, m.default) : null;
    }.call(
      this,
      await eval(
        `import(${JSON.stringify(
          pathToFileURL(thing).toString(),
        )})`,
      ),
    );

  if (mod && mod.prototype instanceof Command) {
    mod = new mod(this);
  }
  else {
    if (!isClass) {delete require.cache[require.resolve(thing)];}
    return undefined;
  }

  if (modules.has(mod.id)) throw new Error('ALREADY LOADED');
  return mod;
};

const loadAll = async (directory, filter = () => true) => {
  const filepaths = Handler.readdirRecursive(directory);

  const promises = [];
  for (let filepath of filepaths) {
    filepath = resolve(filepath);
    if (filter(filepath)) promises.push(await load(filepath));
  }

  await Promise.all(promises);
  return promises;
};

const getMemberPermissions = (userPermissions) => {
  if (!userPermissions) return null;
  if (typeof userPermissions === 'function') {
    return null;
  }
  return PermissionsBitField.resolve(userPermissions).toString();
};

const formatSubCommands = (option, name) => {
  return subCommands
    .filter((subCommand) => subCommand.deploymentDetails.shortName === option.name && subCommand.deploymentDetails.parentCommand === name)
    .map((subCommand) => subCommand.options);
};

const organiseOptions = (command) => {
  if (command.options.length === 0) return;
  command.options.forEach((option) => {
    if (option.type === ApplicationCommandOptionType.Subcommand) {
      option.options = formatSubCommands(option, command.name);
      option.options = option.options.flat();
    }
    else if (option.type === ApplicationCommandOptionType.SubcommandGroup) {
      subGroupCommands.forEach((subGroupCommand) => {
        subGroupCommand.options.forEach((subGroupOption) => {
          subGroupOption.options = formatSubCommands(subGroupOption, subGroupCommand.deploymentDetails.shortName);
          subGroupOption.options = subGroupOption.options.flat();
        });
      });
      option.options = subGroupCommands
        .filter(
          (subGroupCommand) =>
            subGroupCommand.deploymentDetails.shortName === option.name &&
                        subGroupCommand.deploymentDetails.parentCommand === command.name,
        )
        .map((subCommand) => subCommand.options);
      option.options = option.options.flat();
    }
  });
};

const commands = await loadAll(path);

const topLevelCommands = (musicServer, limited) =>
  commands
    .filter((command) =>
      command.deploymentDetails.commandType === 'command' &&
            (musicServer ? command.deploymentDetails.musicServer : !command.deploymentDetails.musicServer) &&
            (limited ? command.deploymentDetails.limited : !command.deploymentDetails.limited),
    )
    .map((command) => ({
      name: command.name,
      description: command.description,
      options: command.options,
      default_member_permissions: getMemberPermissions(command.userPermissions),
      dm_permission: !command.guildOnly,
      integration_types: command.deploymentDetails.integrationTypes,
      contexts: command.deploymentDetails.contexts,
    }));

const globalCommands = topLevelCommands(false, false);
const musicCommands = topLevelCommands(true, false);
const limitedCommands = topLevelCommands(false, true);

const subGroupCommands = commands
  .filter((command) => command.deploymentDetails.commandType === 'group');

const subCommands = commands
  .filter((command) => command.deploymentDetails.commandType === 'sub');

globalCommands.forEach((command) => organiseOptions(command));
musicCommands.forEach((command) => organiseOptions(command));
limitedCommands.forEach((command) => organiseOptions(command));

(async () => {
  try {
    await rest.put(Routes.applicationCommands(clientId), {
      body: globalCommands,
    });
    Logger.info('Refreshed and Deployed Global Commands');

    for (const server of limitedServers) {
      if (musicServers.includes(server)) {
        await rest.put(Routes.applicationGuildCommands(clientId, server), {
          body: [...limitedCommands, ...musicCommands],
        });
        musicServers = musicServers.filter(e => e !== server);
        Logger.info(`Refreshed and Deployed Music and Limited commands for ${server}`);
      }
      else {
        await rest.put(Routes.applicationGuildCommands(clientId, server), {
          body: limitedCommands,
        });
        Logger.info(`Refreshed and Deployed Limited commands for ${server}`);
      }
    }

    for (const server of musicServers) {
      await rest.put(Routes.applicationGuildCommands(clientId, server), {
        body: musicCommands,
      });
      Logger.info(`Refreshed and Deployed Music commands for ${server}`);
    }
    process.exit();
  }
  catch (e) {
    Logger.error(e);
    process.exit();
  }
})();
