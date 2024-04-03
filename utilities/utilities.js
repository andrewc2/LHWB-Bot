import fs from 'fs';

export default class Utilities {
  static getCommandMention(client, commandName) {
    const command = client.apiCommands.find(apiCommand => apiCommand.name === commandName.split(' ')[0].trim());
    if (!command) return `\`/${commandName}\``;
    return `</${commandName}:${command.id}>`;
  }

  static fastFetchStore(stores) {
    const fastFetchStores = stores.filter((store) =>
      store.isFastFetchEnabled(),
    );
    fastFetchStores.forEach(async (store) => await store.post());
  }

  static slowFetchStore(stores) {
    const slowFetchStores = stores.filter(
      (store) => !store.isFastFetchEnabled(),
    );
    slowFetchStores.forEach(async (store) => await store.post());
  }

  static enableStores(stores) {
    const disabledStores = stores.filter((store) => !store.isReady());
    disabledStores.filter((store) => setTimeout(() => store.enableStore(), 10000));
  }

  static isJSON(string) {
    let check = true;
    try {
      JSON.parse(string);
    }
    catch (e) {
      check = false;
    }
    return check;
  }

  static async doesFileExist(filepath) {
    try {
      await fs.promises.access(filepath, fs.constants.F_OK);
      return true;
    }
    catch (error) {
      return false;
    }
  }

  static async loadJSON(path) {
    const fileUrl = new URL(path, import.meta.url);
    return JSON.parse(await fs.promises.readFile(fileUrl, 'utf8'));
  }

  static getVoiceServer(client, guildId) {
    const voiceServers = client.voiceServers;
    return voiceServers.find((voiceServer) => voiceServer.getGuildId() === guildId);
  }
}
