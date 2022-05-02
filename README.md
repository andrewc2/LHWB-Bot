# LosingHimWasBlue-Bot
A bot for our Discord server.

I do not guarantee stability when used on any other server, though it should work.

### Requirements
node.js

Discord.js + Akairo + DiscordJS/Opus + DiscordJS/voice

ffmpeg for music

mysql2 for songs, queues, etc.

sqlite + sqlite3 for bot settings

luxon for countdown, winston for logging, lastfmapi for last fm commands

### Usage
Uses mysql for storage of song information and playcount data, as well as recently played songs, and queues.

### Install Music Bot (using Ubuntu)
`npm install sodium` - as well as it's dependencies

`npm install discord.js @discordjs/rest @discordjs/opus @discordjs/voice discord-api-types`

`npm install mysql2 luxon winston node-fetch lastfmapi`

`npm install github:username1307/discord-akairo` - custom version for LHWB to support slash and prefix commands

`npm install sqlite @vscode/sqlite3`

`npm install fs`

### Install FFMPEG

`apt-get install ffmpeg`

### Point ffmpeg to PATH
Edit `.bashrc` and add `export PATH="/usr/bin/ffmpeg:$PATH"` assuming ffmpeg was installed in the default location

`source .bashrc` to save PATH

### Running
`node index.js`

### Special Thanks to:
username13, FS(@swiftlyanerd), Adam (@louistio), Historicc (@richmoj3), and Donran (@Donran). 
