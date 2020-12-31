const { MessageEmbed } = require('discord.js');
const config = require("./config.json");

function anyUsage(guild, client, text) {
    if (guild) {
        return `\`${client.settings.get(guild.id, 'prefix', config.discord.prefix)}${text}\``
    }
    else {
        return `\`${text}\``
    }
}

function commandUsage(commandName, guild, client, text) {
    return new MessageEmbed()
        .setDescription(`Invalid command usage: the \`${commandName}\` command's accepted format is: ${anyUsage(guild, client, text)}`)
        .setColor('RED')
}

function isMod(message) {
    if (message.guild.id !== config.discord.serverID) return "Server";
    return message.member.roles.cache.some(role => role.id === config.discord.subRedditMod) || message.member.roles.cache.some(role => role.id === config.discord.mod) || message.author.id === config.discord.fs;
}

function cmdRestrictions(message) {
    if (message.guild.id !== config.discord.serverID) return "Server";
    if (isVoiceChannel(message)) return "Voice"
    if ((message.member.roles.cache.some(role => role.id === config.discord.repRole) && message.channel.id === config.discord.botsChannel) || isMod(message)) {
        return null;
    }
    return "Channel";
}

function isVoiceChannel(message) {
    const botVoice = message.client.voice.connections.array()[0].channel.id
    const memberChannel = message.member.voice.channel
    if (memberChannel && memberChannel.id === botVoice) {
        return null;
    }
    return true;
}

function regularRestriction(message) {
    if (message.guild.id !== config.discord.serverID) return "Server";
    if (isVoiceChannel(message)) return "Voice"
    if (message.channel.id === config.discord.botsChannel || isMod(message)) {
        return null;
    }
    return "Channel";
}

module.exports = { anyUsage, commandUsage, cmdRestrictions, regularRestriction }