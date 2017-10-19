# Red-Bot
A bot for the our Discord server.

I do not guarantee stability when used on any other server, though it should work. It currently will only play music on one server at a time. Fully rewritten using discord.js.

### Requirements
node.js

Discord.js

ffmpeg for music

mysql for songs and queues

### Usage
Uses mysql for storage of song information and playcount data, as well as recently played songs, and queues.

### Install Music Bot (using Ubuntu)
`npm install discord.js node-opus --save`

`npm install mysql`

`npm install fs`

### Install FFMPEG
`add-apt-repository ppa:jon-severinsson/ffmpeg`

`apt-get update`

`apt-get install ffmpeg`

### Point ffmpeg to PATH
Edit `.bashrc` and add `export PATH="/usr/bin/ffmpeg:$PATH"` assuming ffmpeg was installed in the default location

`source .bashrc` to save PATH

### Running
`node redBot.js`

### Thanks to:
@swiftlyanerd, @richmoj3 for all the help!
