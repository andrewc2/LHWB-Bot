const { MessageCommand } = require('discord-akairo');
const { commandUsage } = require('../../utilities/utilities');

module.exports = class EnableMessageCommand extends MessageCommand {
  constructor() {
    super('enable', {
      category: 'bot',
      aliases: ['enable'],
      ownerOnly: true,
      channel: 'guild',
      description: {
        content: 'Enables a command globally.',
        usage: 'enable [command]',
        examples: [
          'enable queue',
        ],
      },
      args: [
        {
          id: 'command',
          type: 'commandAlias',
          match: 'content',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  exec(message) {
    return message.channel.send('tbd');
    /* const embed = this.client.util
			.embed()
			.setColor("GREEN");

		const checkCommand = this.client.settings.get(args.command.id, "command");
		if (checkCommand) {
			this.client.settings.delete(args.command.id, "command");
			return message.channel.send({ embeds: [
				embed
					.setDescription(`The \`${args.command.id}\` command has been enabled globally.`),
			] },
			);
		}
		else {
			return message.channel.send({ embeds: [
				embed
					.setDescription(`The \`${args.command.id}\` command is currently not disabled globally.`)
					.setColor("RED"),
			] },
			);
		}*/
  }
};
