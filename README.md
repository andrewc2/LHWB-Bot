# Red-Bot
A bot for our Discord server.

I do not guarantee stability when used on any other server, though it should work. It currently will only play music on one server at a time. Fully rewritten using discord.js for utility, and Eris for audio.

### Requirements
node.js

Discord.js and Eris

ffmpeg for music

mysql for songs and queues

### Usage
Uses mysql for storage of song information and playcount data, as well as recently played songs, and queues.

### Install Music Bot (using Ubuntu)
`npm install discord.js --save`

`npm install eris mysql node-opus`

`npm install fs`

### Install FFMPEG

`apt-get install ffmpeg`

### Point ffmpeg to PATH
Edit `.bashrc` and add `export PATH="/usr/bin/ffmpeg:$PATH"` assuming ffmpeg was installed in the default location

`source .bashrc` to save PATH

### Running
`node rwNonMusic.js`
`node lhwb-music.js`

### Special Thanks to:
FS(@swiftlyanerd), Adam (@louistio) for all the help with the rewrite, and to Historicc (@richmoj3) and Donran (@Donran) for the work on the original bot, that resulted in where we are today. 
