# Red-Bot
A bot for the our Discord server.

I do not guarantee stability when used on any other server, though it should work. It currently will only play music on one server at a time. Not using the redBotNonMusic.js portion, it may not be fully functional.

### Requirements
node.js

Discord.io for music

Discord.js for gifs/polls/etc

ffmpeg for music

mysql for songs

### Usage
Uses mysql for storage of song information and playcount data. Updated to use token login.

### Install Music Bot
`npm install discord.io`

`npm install mysql`

`npm install fs`

### Install FFMPEG
`add-apt-repository ppa:jon-severinsson/ffmpeg`

`apt-get update`

`apt-get install ffmpeg`

### Point ffmpeg to PATH
Edit .bashrc and add `export PATH="/usr/bin/ffmpeg:$PATH"` assuming ffmpeg was installed in the default location

`source .bashrc` to save PATH

### Install Chat Bot
`npm install --save discord.js`

`npm install apigiphy`

### Running
`node redBotMusic.js`

`node redBotNonMusic.js`

### Thanks to:
@FearlessSwiftie, @richmoj3, and the Discord.io people for all the help!
