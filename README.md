# LosingHimWasBlue-Bot
A bot for our Discord server.

I do not guarantee stability when used on any other server, though it should work.

### Requirements
node.js

Discord.js + Custom Akairo (for mixed prefix/slash support) + DiscordJS/Opus, voice, rest, api-types

ffmpeg for music

mysql2 for songs, queues, etc.

luxon for countdown, winston for logging

### Usage
Uses mysql for storage of song information and playcount data, as well as recently played songs, and queues.

### Install FFMPEG

`apt-get install ffmpeg`

### Point ffmpeg to PATH
Edit `.bashrc` and add `export PATH="/usr/bin/ffmpeg:$PATH"` assuming ffmpeg was installed in the default location

`source .bashrc` to save PATH

### Install Music Bot (using Ubuntu)
`apt-get install libtool-bin libtool autoconf automake npm`

`npm install -g n` to install node

`npm install fs`

`npm install pm2 -g`

`npm install` for most other dependencies

### Running
Rename `example.config.json` and `example.voice-servers.json` to remove the `example.` and fill in your information.

`node deploy.js` - to deploy slash commands

`node index.js` - to run bot

### Extra Special Thanks to:
username13 without them this project wouldn't be nearly as good.

### Special Thanks to the previous contributors:
FS(@swiftlyanerd), Adam (@louistio), Historicc (@richmoj3), and Donran (@Donran).

### Spiritual successor to the original fork from
https://github.com/richmoj3/Red-Bot
