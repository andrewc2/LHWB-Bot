const autocomplete = (interaction, handler) => {
  const value = interaction.options.getString('command').toLowerCase() ?? 'a';
  const commands = handler.modules
    .map((command) => ({
      name: command.aliases[0].toLowerCase(),
      value: command.id,
    }))
    .filter((command) => command.name.startsWith(value, 0))
    .splice(0, 10);
  return interaction.respond(commands);
};

module.exports = { autocomplete };
