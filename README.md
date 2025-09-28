# LosingHimWasBlue-Bot

A Taylor Swift themed Discord bot designed to help improve your server! While the bot has been thoroughly
tested, we cannot guarantee stability. However, in almost all cases, the bot should be stable and fully functional when
self-hosted.

### Prerequisites
- Node.js (version 22.18.0)
- MySQL (version 9)
- Redis (version 8)
- ffmpeg
- libtool
- automake
- Discord Account
- Last.fm API

If you are using macOS, you will be able to acquire these tools through [Homebrew](https://brew.sh). For Linux users,
please consult your operating systems package manager. For Windows, please either use
[Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/about) or consult online resources to
acquire these tools and for additional help.

#### Node.js Setup
Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and
more. Node.js runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser.
Digital Ocean provides a good [How To Guide](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04#option-3-installing-node-using-the-node-version-manager)
on how to install Node.js. It is recommended to install Node through Node Version Manager (NVM).

#### Redis Setup
Redis is an in-memory key-value store known for its flexibility, performance, and wide language support. Digital Ocean
provides a good [How To Guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-22-04)
on how to install and secure Redis. It is highly recommended to secure your Redis configuration by giving it a password
and removing dangerous commands. (*Please keep a note of this password as you will need it for later*)

#### MySQL Setup
MySQL is an open-source database management system. It implements the relational model and uses Structured Query Language
(better known as SQL) to manage its data. Again, Digital Ocean provide a good
[How To Guide](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04) on how to install
and set up your own MySQL database server. It is highly recommended to secure your MySQL server by running through the
`mysql_secure_installation` steps.

Once you have created your own MySQL user and run through the secure installation, you should now be ready to create
your own database through the MySQL Command Line Client. For this guide, we will be creating a database with the name
`lhwb` and collation type of `utf8mb4_unicode_ci`.

#### Discord Application Creation
If you have not created a Discord account yet, you can create one [here.](https://discord.com/login)

1. Using your Discord account, login to the [Discord Developer Portal](https://discord.com/developers/) and create a new application.
2. **Make sure to take note of your Application's ID and token.**
3. The "SERVER MEMBERS INTENT" is required for the bot to correctly function.
4. You can invite your app to your server using the following link - make sure to replace `<APPLICATION-ID>` with your bots application ID: `https://discord.com/oauth2/authorize?client_id=<APPLICATION_ID>&permissions=39586771240208&integration_type=0&scope=bot+applications.commands`
5. While not required, feel free to fill out your bots description, tags, and give it a nice profile picture and banner while you're still in the developer portal!

#### Last.fm API Setup
Last.fm is a music service and social platform that tracks users' listening habits through "scrobbling" to create
personalised music taste profiles. LHWB has a set of commands that integrate with Last.fm, so it is important to set up
access to its API.

If you do not have a last.fm account, you can create one [here.](https://www.last.fm/join)

Once you've created your account, you can now [create an API account](https://www.last.fm/api/account/create). It is
very important that you take note of any credentials last.fm provides you with as these will not be visible again without
creating a brand-new API account.

### Config Setup
There are a few configuration files that you will need to configure before we can continue. These are:

- `example.config.json`
- `example.merch-stores.json`
- `example.music-servers.json`

Duplicate each of these files and remove the `example.` prefix so that the bot will detect these files on boot. Below are
examples of how each configuration file should look, once fully configured:

#### config.json
```json
{
  "discord": {
    "token": "@bqWQ3J+GzMG64-k{Who]gMxUV(?(x0w6s|bBm'",
    "owner_id": "1972006170101518737", 
    "client_id": "1972006170105135506",
    "mod_role_id": "1972006170104304019"
  },
  "lastfm": {
    "api_key": "sgaqc|U.#j(Sa!}-d9?7OJMuBrC/=-WU8v9@!t",
    "api_secret": "6g1GBPdP4dm8pPJdkpLTV8UqubAdmXYgy9KL5oH"
  },
  "mysql": {
    "host": "localhost",
    "username": "musicfan",
    "password": "RHwzIbGFViuXRKRsGI3j8bu6agVulkyPjTeRyV8",
    "port": "3306",
    "database": "lhwb"
  },
  "redis": {
    "host": "localhost",
    "port": "6379",
    "password": "lobsZ4cAdKlemq8uWxTUvXO2ZPXQCow99z3tTdO"
  }
}
```

#### music-servers.json
```json
[
  {
    "root_filepath": "/Volumes/Music/",
    "primary_artist": "Taylor Swift",
    "voice_channel_id": "1972007463777757958",
    "stage_channel_id": "1972007463776422663",
    "guild_id": "1972007463778519816"
  }
]
```

- This bot is designed to work in multiple servers. However, the bot cannot be in multiple voice channels **IN THE SAME SERVER** at the same time.
- Make sure the `root_filepath` ends with a slash (`/`) otherwise the bot will not find music. The `root_filepath` is meant to be the directory where all your individual music files or folders will be stored.
- The rest of the filepath will be specified in the `song` table in the MySQL database. For example `root_filepath` = `/Volumes/Music/` and in the `song` table set the `path` column to `Taylor Swift/You Belong With Me.mp3`

#### merch-stores.json
```json
[
  {
    "store_name": "My Store",
    "store_name_short": "mystore",
    "store_url": "https://store.mywebsite.com",
    "discord_information": [
      {
        "channel_id": "1972007463775628041",
        "role_id": "1972007756530302709"
      }
    ],
    "currency_symbol": "£",
    "enable_cart": true,
    "enable_buy_now": true,
    "interval": 10000,
    "mass_ping_limit": 10
  }
]
```

You may need to enable [Discord Developer Mode](https://www.reddit.com/r/discordapp/comments/pf1qx0/what_is_developer_mode/)
to get channel, role, user etc. ID's.

### Bot Setup
LosingHimWasBlue-Bot is split up into three individual bots. These are:

- music-bot: Music Bot takes control of all music related commands and operations.
- utility-bot: Utility Bot takes control of all utility commands. Utility commands are commands that are designed to work globally across Discord - no matter if the bot is added to a server or a user.
- merch-bot: Merch Bot controls everything to do with store pings and updates. It does not have any direct commands and functions mostly in the background.

By splitting the bot into three smaller bots it allows for easier and smoother development, along with improved scalability.

#### Local Development

1. Run `npm install` to automatically install all the required node modules. This could take around ~10 minutes to complete.
2. Run `npm run build` to compile the TypeScript source code into JavaScript. You should now have a `dist` directory in each workspace.
3. You should now be able to boot up all the bots using the following commands
   - `npm run start:music`
   - `npm run start:utility`
   - `npm run start:merch`

#### Production

To make it easier for production use, you can use [PM2](https://pm2.keymetrics.io). Follow Step 1 & 2 from the Local
Development section, and then you can run `pm2 start ecosystem.config.cjs` and it should automatically start up all three
bots.

### Slash Command Deployment
The Slash Command Deployment system is designed to work two ways. You can deploy commands locally using the `local.js`
script located in `deployment/build`, and you can deploy commands automatically when pushing to your GitHub repository.
Consult the `README.md` file in the `deplyoment/build` directory for more information.

#### Local Deployment
Local Deployment will deploy all commands globally on Discord. This means that anyone can access them, even music commands
outside of music servers.

To deploy commands locally, run the following command: `npm run deploy:local`

#### Production Deployment

1. Set up the following [secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) in your GitHub repository
    - CLIENTID: This is your Bot's Client ID. It can be found in the Discord Developer portal.
    - TOKEN: This is your bots Token. It is what you use to connect to Discord.
    - LIMITED_SERVERS: This is a comma seperated list of servers where limited commands will be deployed to. These commands will only be accessible in those servers.
      - This should look something like: `1972007463775628041,1972007756530302709`
    - MUSIC_SERVERS: This is a comma seperated list of servers where music related commands will be deployed to. This list should match the guild id's set in `music-servers.json`. Music related commands will only be deployed to these servers.
      - This should look something like: `1972007463775628040,1972007756530302710`
2. Merge, or push, to the main branch on your GitHub repository.
3. The action should automatically start.

### Common Issues
- **Q:** "My bot is not joining my voice channel."
- **A:** Make sure your bot has the correct permissions to join the voice channel, also double check that your `voice_channel_id`, `stage_channel_id`, and `guild_id` are correct in your config file.


- **Q:** "My bot joined the voice channel but is not playing anything."
- **A:** Make sure your `primary_artist` has music available in the `song` table that is set to autoplay, as this will be the music that is played automatically.


- **Q:** "My question is not answered here."
- **A:** Open an [issue](https://github.com/andrewc2/LHWB-Bot/issues), and we'll try to get back to you as soon as possible!

### Extra Special Thanks to:
username13 for doing all the heavy lifting.

### Special Thanks to the previous contributors:
FS(@swiftlyanerd), Adam (@adamgauthier), Historicc (@josh-richmond), and Donran (@donran).

### Spiritual successor to the original fork from
https://web.archive.org/web/20200905223005/https://github.com/richmoj3/Red-Bot