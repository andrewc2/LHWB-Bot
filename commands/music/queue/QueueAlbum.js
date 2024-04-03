import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType, Colors, EmbedBuilder, PermissionsBitField } from 'discord.js';
import { database } from '../../../models/database.js';
import { GET_ALBUM, QUEUE_ALBUM } from '../../../models/musicQueries.js';
import Utilities from '../../../utilities/Utilities.js';
import fs from 'fs';
import { albumAutocomplete } from '../../../commandUtilities/queueUtilities.js';
import Permission from '../../../utilities/Permission.js';

export default class QueueAlbum extends Command {
  constructor() {
    super('queueAlbum', {
      name: 'queue album',
      category: 'music',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
      options: [
        {
          name: 'album',
          description: 'The name of the album to add to the queue',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'queue',
        shortName: 'album',
      },
    });
  }

  async userPermissions(interaction) {
    return await Permission.musicTrustedPermissionsCheck(this.client, interaction);
  }

  async exec(interaction) {
    await interaction.deferReply();
    const name = interaction.options.getString('album', true);

    const [album] = await database.promise().query(GET_ALBUM, [name]);

    if (album.length === 0) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription('Sorry, I couldn\'t find this album. Please try again with a different album.')
            .setColor(Colors.Red),
        ],
      });
    }

    const server = Utilities.getVoiceServer(this.client, interaction.guildId);
    const queue = await server.getQueue();
    const filepath = server.getFilePath();

    queue.forEach((song) => {
      if (song['album'] === name) {
        server.dequeue(song['song_detail_id']);
      }
    });

    const songs = album
      .filter((song) => fs.existsSync(`${filepath}${song['path']}`))
      .map((song) => [song['id'], interaction.guildId, interaction.user.username]);

    if (songs.length === 0) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Unable to queue ${album[0]['album']}.`)
            .setColor(Colors.Red),
        ],
      });
    }

    database.query(QUEUE_ALBUM, [songs]);
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${album[0]['album']} by ${album[0]['artist_name']} has been queued.`)
          .setColor(Colors.Green),
      ],
    });
  }

  async autocomplete(interaction) {
    await albumAutocomplete(interaction);
  }
}
