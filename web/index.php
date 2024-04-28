<?php require_once('includes/header.php'); ?>
            <style>
                @font-face {
                  font-family: tswift;
                  src: url(TaylorSwiftHandwriting.ttf);
                }
                .nowplaying {
                    color:#ffffff;
                    font-size: 22px;
                    font-family: tswift, arial, sans-serif;
                    display: inline;
                }
                h4 {
                    text-align: center;
                }
                ul {
                    display: inline-block;
                    text-align: left;
                    list-style-type: square;
                }
                #commands {
                    text-align: center;
                    padding: 10px 0 20px 0;
                }
                #dataStore {
                    margin-bottom: 10px; float: none; margin: 0 auto; text-align: center;
                }
            </style>

            <div class="container-fluid">
                <div id="commands">
                    <h4><u>Album Commands</u></h4>
                    <ul>
                        <li>/album debut: Displays the track listing for Taylor Swift's Debut album.</li>
                        <li>/album beautiful-eyes: Displays the track listing for Beautiful Eyes.</li>
                        <li>/album fearless: Displays the track listing for Fearless and Fearless (Taylor's Version).</li>
                        <li>/album speak-now: Displays the track listing for Speak Now and Speak Now (Taylor's Version).</li>
                        <li>/album red: Displays the track listing for Red and Red (Taylor's Version).</li>
                        <li>/album 1989: Displays the track listing for 1989 and 1989 (Taylor's Version).</li>
                        <li>/album reputation: Displays the track listing for reputation.</li>
                        <li>/album lover: Displays the track listing for Lover.</li>
                        <li>/album folklore: Displays the track listing for folklore.</li>
                        <li>/album evermore: Displays the track listing for evermore.</li>
                        <li>/album midnights: Displays the track listing for Midnights.</li>
                        <li>/album the-tortured-poets-department: Displays the track listing for<br>THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY.</li>
                    
                        <h4><u>Tour Commands</u></h4>
                    
                        <li>/tour red guests: Displays the special guests on The Red Tour.</li>
                        <li>/tour 1989 guests: Displays the special guests on the 1989 World Tour.</li>
                        <li>/tour reputation guests: Displays the special guests on the reputation Stadium Tour.</li>
                        <li>/tour red setlist: Displays The Red Tour typical set list.</li>
                        <li>/tour 1989 setlist: Displays the 1989 World Tour typical set list.</li>
                        <li>/tour reputation setlist: Displays the reputation Stadium Tour typical set list.</li>
                        <li>/tour 1989 secret-songs: Displays the complete list of 1989 World Tour secret songs.</li>
                        <li>/tour reputation secret-songs: Displays the complete list of reputation Stadium Tour secret songs.</li>
                        <li>/tour eras surprise-songs: Displays the complete list of The Eras Tour surprise songs.</li>
                        <li>/tour eras setlist: Displays The Eras Tour typical set list.</li>
                        <li>/tour eras countdown: Displays the upcoming The Eras Tour shows.</li>
                    
                        <h4><u>Misc Commands</u></h4>
                    
                        <li>/countdown: provides an embed of relevant Taylor countdowns.</li>
                        <li>/gif: replies with a random gif.</li>
                        <li>/version: current version of the bot.</li>
                        <li>/request [type] [feature]: Logs a user's request for a bot feature or song/gif etc.</li>
                        <li>/wtf: replies with a random !g wtf[#].</li>
                        <li>/wtny: sends the welcome to discord skyline gif.</li>
                    
                        <h4><u>Last FM Commands</u></h4>
                    
                        <li>/lastfm current: displays an embed of your profile if set.</li>
                        <li>/lastfm current [user]: displays an embed of @user's profile if set.</li>
                        <li>/lastfm search [lastfm_user]: displays an embed of a requested lastfm user.</li>
                        <li>/lastfm set [lastfm_user]: sets your lastfm profile.</li>
                        <li>/lastfm clear: clears your lastfm profile.</li>
                    
                        <h4><u>Pinglist Commands</u></h4>
                    
                        <li>/lping joined: Displays the pinglists you're on</li>
                        <li>/lping list: Displays the available pinglists</li>
                        <li>/lping get [pinglist]: Adds a pinglist to the users requested pings</li>
                        <li>/lping drop [pinglist]: Removes a pinglist from the users requested pings</li>
                        <li>/lping ping pinglist:[list to ping]: Pings the list [trusted role only]</li>
                        <li>/lping show [pinglist]: Displays an embed with all members of a pinglist [mod only]</li>
                        <li>/lping create [pinglist]: Creates a pinglist that users can join [mod only]</li>
                        <li>/lping delete [pinglist]: Deletes a pinglist entirely [mod only]</li>
                    
                        <!-- <h4><u>Music Commands</u></h4>
                        <li>/queue show: Displays the current song queue [Bots Channel Only]</li>
                        <li>/queue add [song]: Adds a song to the current queue [Bots Channel Only]</li>
                        <li>/queue album [album]: Adds an entire album to the current queue [Mods Only]</li>
                        <li>/queue album-list: Displays the albums which are queueable [Bots Channel Only]</li>
                        <li>/current: Displays the current song name along side the user who queued it</li>
                        <li>/rank-play [num]: Displays a list of length 'num' order by most played (default is 5, max of 25)</li>
                        <li>/recent [server/user]: Displays the 10 most recently played songs for the server or specified user</li>
                        <li>/track list: Returns a link with all songs available on LHWB</li>
                        <li>/track information [song]: View information about a track</li>
                        
                        <li>/queue remove [song]: Removes a song from the queue [Trusted Role Only]</li>
                        <li>/queue clear: Removes all songs from the current queue [Trusted Role Only]</li>
                        <li>/rejoin: Put's the bot back in it's default voice channel [Trusted Role Only]</li>
                        <li>/skip: Skips the current song [Trusted Role Only]</li>
                        <li>/pause: Tells the bot to start playing music [Mod Only]</li>
                        <li>/resume: Tells the bot to stop playing music [Mod Only]</li>
                        <li>/stage: Put's the bot in server's stage channel [Mod Only]</li> -->

                        <h4><u>Mod Commands</u></h4>
                        
                        <li>/spam add [channel]: Make a channel a spam channel</li>
                        <li>/spam remove [channel]: Remove a channel from being a spam channel</li>
                        <li>/spam view: View all added spam channels</li>
                        <li>/trusted set option:[role]: Make a role trusted by the bot for limited access commands</li>
                        <li>/trusted clear: Clear the trusted role</li>
                        <li>/trusted view: View the trusted role</li>
                        <li>/restart: Restarts the bot</li>

                        <h4><u>Owner Commands</u></h4>

                        <li>/owner ban [user]: Bans a user from the bot</li>
                        <li>/owner unban [user]: Un-Bans a user from the bot</li>
                        <li>/owner avatar [name]: Changes the bot's avatar</li>
                        <li>/owner say [channeId] [name]: Sends messages to chat as the bot</li>
                        <li>/owner nickname [name]: Changes the bot's nickname</li>
                    </ul>
                </div>
            </div>
        </div>
    </body>
</html>
