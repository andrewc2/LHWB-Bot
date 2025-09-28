import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  escapeNumberedList,
  ChatInputCommandInteraction,
  Message,
  ColorResolvable,
  ButtonInteraction,
  InteractionEditReplyOptions,
  EmbedAuthorOptions,
} from 'discord.js';

import { EmbedFormatter } from './EmbedFormatter.js';
import { LoggerTool } from './Logging.js';

const noEmbedsString =
  'There is not enough information for this command to work right now. Try again later.';

export class Paginator {
  private interaction: ChatInputCommandInteraction;
  private readonly embedArray: EmbedFormatter[];
  private logger: LoggerTool;
  private readonly deletable: boolean;
  private readonly noEmbedErrorString: string;

  /**
   * Creates an interaction based embed paginator that allows users to see more data in a concise format
   * @param interaction An instance of ChatInputInteraction
   * @param embedArray An array of EmbedFormatter that will be used to build the pagination
   * @param logger Logging tool used to log any errors that may occur
   * @param deletable Whether the paginated response should be user deletable
   * @param noEmbedErrorString Custom description that will be sent whenever the embedArray is empty
   */
  constructor(
    interaction: ChatInputCommandInteraction,
    embedArray: EmbedFormatter[],
    logger: LoggerTool,
    deletable = true,
    noEmbedErrorString = noEmbedsString,
  ) {
    this.interaction = interaction;
    this.embedArray = embedArray;
    this.logger = logger;
    this.deletable = deletable;
    this.noEmbedErrorString = noEmbedErrorString;
  }

  private previousButton(): ButtonBuilder {
    return new ButtonBuilder()
      .setCustomId('previousButton')
      .setLabel('Previous')
      .setStyle(ButtonStyle.Secondary);
  }

  private nextButton(): ButtonBuilder {
    return new ButtonBuilder()
      .setCustomId('nextButton')
      .setLabel('Next')
      .setStyle(ButtonStyle.Secondary);
  }

  private deleteButton(): ButtonBuilder {
    return new ButtonBuilder()
      .setCustomId('deleteButton')
      .setLabel('Delete')
      .setStyle(ButtonStyle.Danger);
  }

  private createPayload(): InteractionEditReplyOptions {
    return this.embedArray.length === 1
      ? this.deletable
        ? {
            embeds: [this.embedArray[0]],
            components: [
              new ActionRowBuilder<ButtonBuilder>().addComponents(
                this.deleteButton(),
              ),
            ],
          }
        : { embeds: [this.embedArray[0]] }
      : this.deletable
        ? {
            embeds: [this.embedArray[0]],
            components: [
              new ActionRowBuilder<ButtonBuilder>().addComponents(
                this.previousButton(),
                this.nextButton(),
                this.deleteButton(),
              ),
            ],
          }
        : {
            embeds: [this.embedArray[0]],
            components: [
              new ActionRowBuilder<ButtonBuilder>().addComponents(
                this.previousButton(),
                this.nextButton(),
              ),
            ],
          };
  }

  private handler(message: Message) {
    let i = 0;
    const filter = async (interaction: ButtonInteraction) => {
      await interaction.deferUpdate();
      return interaction.user.id === this.interaction.user.id;
    };

    const collector = message.createMessageComponentCollector({
      filter,
      componentType: ComponentType.Button,
      idle: 20000,
    });

    collector.on('collect', (interaction) => {
      if (interaction.customId === 'deleteButton') {
        void interaction.deleteReply();
      } else if (interaction.customId === 'nextButton') {
        i++;
        if (i >= this.embedArray.length) i = 0;
        void interaction.editReply({
          embeds: [this.embedArray[i]],
        });
      } else {
        i--;
        if (i < 0) i = this.embedArray.length - 1;
        void interaction.editReply({
          embeds: [this.embedArray[i]],
        });
      }
    });

    collector.on('end', () => {
      message.edit({ components: [] }).catch((err) => {
        this.logger.warn(err);
      });
    });
  }

  /**
   * Sends the paginated response into the channel where the interaction was initialised
   * @public
   */
  public async send() {
    if (this.embedArray.length === 0) {
      return this.interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            this.noEmbedErrorString,
          ),
        ],
      });
    }
    await this.interaction
      .editReply(this.createPayload())
      .then((message) => this.handler(message));
  }

  /**
   * Create an array of embeds that can then be used when initialising an instance of Paginator
   * @static
   * @param data The data to add to the embeds
   * @param embedTitle The title that should be displayed on the embed
   * @param color The colour the embeds should be
   * @param author The data that should be shown in the author field (please make sure this follows discord.js EmbedAuthorData interface https://discord.js.org/docs/packages/discord.js/main/EmbedAuthorData:Interface)
   * @param footer The data that should be shown in the author field (this should be a string)
   * @param thumbnail The image url that will be displayed in the embed thumbnail
   * @param url The url to add to the embed title
   * @param chunk How many rows from the data that should be displayed on one embed
   * @returns {EmbedFormatter[]}
   */
  public static createEmbeds(
    data: string[],
    embedTitle: string,
    color: ColorResolvable,
    author: EmbedAuthorOptions | null = null,
    footer: string | null = null,
    thumbnail: string | null = null,
    url: string | null = null,
    chunk: number = 10,
  ): EmbedFormatter[] {
    const embeds: EmbedFormatter[] = [];
    const results: string[][] = data.reduce(
      (all: string[][], one: string, i: number): string[][] => {
        const ch = Math.floor(i / chunk);
        all[ch] = (all[ch] || []).concat(one);
        return all;
      },
      [],
    );

    results.forEach((result, i) => {
      embeds.push(
        EmbedFormatter.plainEmbed(color)
          .setTitle(embedTitle)
          .setAuthor(author)
          .setDescription(escapeNumberedList(result.join('')))
          .setThumbnail(thumbnail)
          .setURL(url)
          .setFooter({
            text: `Page ${i + 1}/${results.length} ${footer ? footer : ''}`.trim(),
          }),
      );
    });

    return embeds;
  }
}
