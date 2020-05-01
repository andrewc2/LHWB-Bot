# LosingHimWasBlue-Bot
A bot for our Discord server.

I do not guarantee stability when used on any other server, though it should work. It currently will only play music on one server at a time. Fully rewritten using discord.js for utility, and Eris for audio.

### Requirements
node.js

Discord.js and Eris

ffmpeg for music

mysql for songs and queues

### Usage
Uses mysql for storage of song information, playcount data, recently played songs, and queues.
All music queueing, status, currently playing, song ranks, etc is all provided via `rwNonMusic.js`. Only queue iteration, and music play logging, music play/stop/skip handling is done via `lhwb-erismusic.js`.

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

### Feature Requests / ToDo:
* Queue full albums for events
* Allow songs to be marked as un-queueable, w/ possible mod override (for example non-taylor songs added for an event)
* Allow songs to be queued with short name versions, under one single database entry for the song (for example "YBWM" triggers the "You Belong With Me" database entry, currently done having 2 database lines pointing to the same file path) 

* Track queued songs separate from random play
* Some method for running the bot in multiple servers, may be difficult due to bot being split between two separate bots.
