const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');
const config = require('./config.json');
const { Constants } = require("discord.js");
const { SlashCommand } = require("discord-akairo");

const modules = new Collection();
const clientId =
    config.slashConfig.env === 'DEV'
        ? config.slashConfig.dev_client_id
        : config.slashConfig.pro_client_id;
const guildId = config.slashConfig.test_guild_id;
const slashCommands = [];
const rest = new REST({ version: '9' }).setToken(config.discord.discord_token);

function getCommands(directory) {
    const result = [];
    (function read(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filepath = path.join(dir, file);
            if (fs.statSync(filepath).isDirectory()) {
                read(filepath);
            } else {
                result.push(filepath);
            }
        }
    })(directory);
    return result;
}

async function getCommandDetails(thing, classToHandle) {
    const isClass = typeof thing === 'function';
    const extensions = ['.js', '.json', '.ts'];
    if (!isClass && !extensions.includes(path.extname(thing))) return undefined;

    let mod = isClass
        ? thing
        : function findExport(m) {
            if (!m) return null;
            if (m.prototype instanceof classToHandle) return m;
            return m.default ? findExport.call(this, m.default) : null;
        }.call(this, require(thing));

    if (mod && mod.prototype instanceof classToHandle) {
        mod = new mod(this);
    } else {
        if (!isClass) delete require.cache[require.resolve(thing)];
        return undefined;
    }

    if (modules.has(mod.id)) throw new Error('ALREADY LOADED');
    return mod;
}

const findCommands = (path) =>
    getCommands(path).filter((file) => file.endsWith('.js'));

const commandDetails = async (commands) => {
    for (const command of commands.values()) {
        const commandDetails = await getCommandDetails(command, SlashCommand);
        if (commandDetails === undefined) return;
        slashCommands.push(commandDetails);
    }
};

const arrangeSlashCommand = async () => {
    const topLevelCommands = slashCommands
        .filter((command) => command.commandType === 'command')
        .map((command) => ({
            name: command.name,
            description: command.description,
            options: command.args,
        }));

    const subCommands = slashCommands.filter(
        (command) => command.commandType === 'sub'
    );

    const subCommandGroups = slashCommands.filter(
        (command) => command.commandType === 'group'
    );

    topLevelCommands.forEach((command) => {
        if (command.options === undefined) return;
        command.options.forEach((option) => {
            if (
                option.type ===
                Constants.ApplicationCommandOptionTypes.SUB_COMMAND
            ) {
                option.options = subCommands
                    .filter(
                        (subCommand) =>
                            subCommand.shortCommandName === option.name &&
                            subCommand.parentCommandName === command.name
                    )
                    .map((subCommand) => subCommand.args);
                option.options = option.options.flat();
            } else if (
                option.type ===
                Constants.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP
            ) {
                subCommandGroups.forEach((subCommandGroup) => {
                    subCommandGroup.args.forEach(
                        (groupOptions) => {
                            groupOptions.options = subCommands
                                .filter(
                                    (subCommand) =>
                                        subCommand.shortCommandName ===
                                        groupOptions.name &&
                                        subCommand.parentCommandName ===
                                        subCommandGroup.shortCommandName
                                )
                                .map((subCommand) => subCommand.args);
                            groupOptions.options = groupOptions.options.flat();
                        }
                    );
                });
                option.options = subCommandGroups
                    .filter(
                        (subCommandGroup) =>
                            subCommandGroup.shortCommandName === option.name &&
                            subCommandGroup.parentCommandName === command.name
                    )
                    .map((subCommand) => subCommand.args);
                option.options = option.options.flat();
            }
        });
    });

    return topLevelCommands;
};

(async () => {
    try {
        await commandDetails(findCommands(config.slashConfig.slash_filepath));
        const formattedSlashCommands = await arrangeSlashCommand();
        if (config.slashConfig.env === 'DEV') {
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: formattedSlashCommands,
            });
            console.log('Refreshed & Deployed Guild Application Commands.');
        } else {
            await rest.put(Routes.applicationCommands(clientId), {
                body: formattedSlashCommands,
            });
            console.log('Refreshed & Deployed Global Application Commands.');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit();
    }
})();
