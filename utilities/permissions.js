const { Permissions } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
const { db } = require("../models/db");
const voiceServers = require("../voice-servers.json");

const GET_PERMISSION = "SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?";

const permissionType = {
	ROLE: "role",
	CHANNEL: "channel",
};

function getConnection(message) {
	const connection = getVoiceConnection(message.guild.id);
	return connection.joinConfig.channelId;
}

function isVoiceServer(guildId) {
	const channels = voiceServers.map(x => x.server_id);
	if (channels.includes(guildId)) return null;
	return true;
}

function isMod(member) {
	if (member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return null;
	return true;
}

async function isTrusted(member) {
	const [result] = await db.promise().query(GET_PERMISSION, [member.guild.id, permissionType.ROLE]);
	if (member.roles.cache.has(result[0]["role_id"]) || member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return null;
	return true;
}

async function isSpamChannel(channel) {
	const [result] = await db.promise().query(GET_PERMISSION, [channel.guild.id, permissionType.CHANNEL]);
	if (result.map(x => x.channel_id).includes(channel.id)) return null;
	return true;
}

function isVoiceChannel(message) {
	const botVoice = getConnection(message);
	const memberChannel = message.member.voice.channel;
	if (memberChannel && memberChannel.id === botVoice) return null;
	return true;
}

function isVoiceServerAndMod(message) {
	if (isVoiceServer(message.guild.id)) return "Server";
	if (isMod(message.member)) return "Mod";
	return null;
}

function noVoiceServerAndMod(message) {
	if (isMod(message.member)) return "Mod";
	return null;
}

async function regularRestriction(message) {
	if (await isVoiceServer(message.guild.id)) return "Server";
	if (isVoiceChannel(message)) return "Voice";
	if (!await isSpamChannel(message.channel) || !isMod(message.member)) return null;
	return "Channel";
}

async function cmdRestrictions(message) {
	if (await isVoiceServer(message.guild.id)) return "Server";
	if (isVoiceChannel(message)) return "Voice";
	if (!isMod(message.member)) return null;
	if (await isSpamChannel(message.channel)) return "Channel";
	if (!await isTrusted(message.member)) return null;
	return "Role";
}

async function cmdRestrictionsNoVC(message) {
	if (await isVoiceServer(message.guild)) return "Server";
	if (!isMod(message.member)) return null;
	if (!await isTrusted(message.member)) return null;
	return "Role";
}

function isMusicServer(message) {
	if (isVoiceServer(message.guild.id)) return "Server";
	return null;
}

module.exports = { isVoiceServer, isTrusted, isVoiceServerAndMod, noVoiceServerAndMod, regularRestriction, cmdRestrictions, cmdRestrictionsNoVC, isMusicServer, permissionType };
