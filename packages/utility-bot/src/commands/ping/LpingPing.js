import { Command } from '@lhwb/framework';
import { EmbedFormatter, Permission } from '@lhwb/shared';
import {
  ApplicationCommandOptionType,
  Colors,
  ComponentType,
} from 'discord.js';

import Ping, { PINGLIST_NOT_FOUND } from '../../modules/ping/Ping.js';

export default class LpingPing extends Command {
  constructor() {
    super('lpingPing', {
      name: 'lping ping',
      description: 'Ping a pinglist',
      category: 'ping',
      options: [
        {
          name: 'pinglist',
          description: 'The name of the pinglist to ping',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
          max_length: 40,
        },
        {
          name: 'message',
          description: 'The message to send along with the ping',
          type: ApplicationCommandOptionType.String,
          required: false,
          max_length: 40,
        },
      ],
    });
  }

  async exec(interaction) {
    const name = interaction.options
      .getString('pinglist', true)
      .replace(/\s/g, '')
      .toLowerCase();
    const message = interaction.options.getString('message');

    const isTrustedMember = await Permission.isTrustedMember(
      this.client.database,
      interaction.member,
    );

    if (!isTrustedMember) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            "Sorry, you don't have the correct permissions to ping a pinglist.",
          ),
        ],
      });
    }

    const pinglistExists = await Ping.pinglistExists(
      name,
      interaction.guild.id,
      this.client,
    );

    if (!pinglistExists) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            PINGLIST_NOT_FOUND(name, this.client),
          ),
        ],
      });
    }

    const warningEmbed = EmbedFormatter.plainEmbed(Colors.Yellow)
      .setTitle(`Ping ${name}?`)
      .setDescription(
        `${interaction.user}, This command **WILL SEND a potential mass ping.** Are you sure you want to **PING** this pinglist? This is **NOT** how you GET the list.`,
      )
      .setColor(Colors.Yellow);

    try {
      const response = await interaction.editReply({
        embeds: [warningEmbed],
        components: [Ping.pinglistWarningButton()],
      });

      const filter = async (i) => {
        await i.deferUpdate();
        return i.user.id === interaction.user.id;
      };

      const i = await response.awaitMessageComponent({
        filter,
        componentType: ComponentType.Button,
        time: 10000,
      });

      if (i.customId === 'send') {
        await Ping.pingFollowup(name, message, interaction, this.client);
      } else {
        await i.deleteReply();
      }
    } catch {
      await interaction.deleteReply();
    }
  }

  async autocomplete(interaction) {
    await Ping.pingAutocomplete(interaction, this.client);
  }
}
