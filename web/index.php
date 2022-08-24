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
            <div id="dataDisplay">
                <div id="dataStore">
                    <?php
                        $stmt = $db->prepare("SELECT id FROM songRecent WHERE 1 ORDER BY id DESC LIMIT 1");
                        $stmt->execute();
                        $stmt->bind_result($id);
                        while ($stmt->fetch())
                        {
                            echo "<div class='nowplaying'>Total number of songs played: &nbsp;".htmlspecialchars($id + 510246)."</div>";
                        }
                    ?>
                </div>
            </div>

            <div class="container-fluid">
                <div id="commands">
                    <h4><u>Music Commands</u></h4>
                    <ul>
                        <li>!q/!queue or /queue show: Displays the current song queue [Bots Channel Only]</li>
                        <li>!q/!queue [song] or /queue add [song]: Adds a song to the current queue [Bots Channel Only]</li>
                        <li>!qa/!queue album [album] or /queue album [album]: Adds an entire album to the current queue [Mods Only]</li>
                        <li>!albumlist or /queue album-list: Displays the albums which are queueable [Bots Channel Only]</li>
                        <li>!current or /current: Displays the current song name along side the user who queued it</li>
                        <li>!pc/!playcount [song] or /track play-count [song]: Displays the play count for the specified song</li>
                        <li>!rankplays [num] or /rank-play [num]: Displays a list of length 'num' order by most played (default is 5, max of 25)</li>
                        <li>!recent or /recent: Displays the 10 most recently played songs</li>
                        <li>!tracks or /track list: Returns a link with all songs available on LHWB</li>
                        <li>/track information [song]: View information about a track</li>
                        
                        <li>!dq/!dequeue [song] or /queue remove object:[song]: Removes a song from the queue [Trusted Role Only]</li>
                        <li>!cq/!clearqueue or /queue clear: Removes all songs from the current queue [Trusted Role Only]</li>
                        <li>!rejoin or /rejoin: Put's the bot back in it's default voice channel [Trusted Role Only]</li>
                        <li>!lskip or /skip: Skips the current song [Trusted Role Only]</li>
                        <li>!lpause or /pause: Tells the bot to start playing music [Mod Only]</li>
                        <li>!lresume or /resume: Tells the bot to stop playing music [Mod Only]</li>
                        <li>!stage or /stage: Put's the bot in server's stage channel [Mod Only]</li>
                    
                        <h4><u>Album Commands</u></h4>
                    
                        <li>/album debut: Displays the track listing for Taylor Swift's Debut album.</li>
                        <li>/album beautiful-eyes: Displays the track listing for Beautiful Eyes.</li>
                        <li>/album fearless: Displays the track listing for Fearless and Fearless (Taylor's Version).</li>
                        <li>/album speak-now: Displays the track listing for Speak Now.</li>
                        <li>/album red: Displays the track listing for Red and Red (Taylor's Version).</li>
                        <li>/album 1989: Displays the track listing for 1989.</li>
                        <li>/album reputation: Displays the track listing for reputation.</li>
                        <li>/album lover: Displays the track listing for Lover.</li>
                        <li>/album folklore: Displays the track listing for folklore.</li>
                        <li>/album evermore: Displays the track listing for evermore.</li>
                    
                        <h4><u>Tour Commands</u></h4>
                    
                        <li>/tour red guests: Displays the special guests on The Red Tour.</li>
                        <li>/tour 1989 guests: Displays the special guests on the 1989 World Tour.</li>
                        <li>/tour reputation guests: Displays the special guests on the reputation Stadium Tour.</li>
                        <li>/tour red setlist: Displays The Red Tour typical set list.</li>
                        <li>/tour 1989 setlist: Displays the 1989 World Tour typical set list.</li>
                        <li>/tour reputation setlist: Displays the reputation Stadium Tour typical set list.</li>
                        <li>/tour 1989 secret-songs: Displays the complete list of 1989 World Tour secret songs.</li>
                        <li>/tour reputation secret-songs: Displays the complete list of reputation Stadium Tour secret songs.</li>
                    
                        <h4><u>Misc Commands</u></h4>
                    
                        <li>/countdown: provides an embed of relevant Taylor countdowns.</li>
                        <li>/debtcounter: displays WetPatootie's current oof debt.</li>
                        <li>/gif: replies with a random gif.</li>
                        <li>!lhelp: help lookup tool, as well as this website.</li>
                        <li>!lversion or /version: current version of the bot.</li>
                        <li>!prefix: replies with the bot's prefix in that server</li>
                        <li>/request [type] [feature]: Logs a user's request for a bot feature or song/gif etc.</li>
                        <li>!stream/!livestream or /livestream: information regarding the stream server.</li>
                        <li>!store or /store: View items available on Taylor's merch store.</li>
                        <li>!wtf or /wtf: replies with a random !g wtf[#].</li>
                        <li>!wtny or /wtny: sends the welcome to discord skyline gif.</li>
                    
                        <h4><u>Last FM Commands</u></h4>
                    
                        <li>!lfm or /lastfm current: displays an embed of your profile if set.</li>
                        <li>!lfm [user] or /lastfm current [user]: displays an embed of @user's profile if set.</li>
                        <li>!lfm search [lastfm_user] or /lastfm search [lastfm_user]: displays an embed of a requested lastfm user.</li>
                        <li>!lfm set [lastfm_user] or /lastfm set [lastfm_user]: sets your lastfm profile.</li>
                        <li>!lfm clear or /lastfm clear: clears your lastfm profile.</li>
                    
                        <h4><u>Pinglist Commands</u></h4>
                    
                        <li>!lping or /lping joined: Displays the pinglists you're on</li>
                        <li>!lping list or /lping list: Displays the available pinglists</li>
                        <li>!lping get [list name] or /lping get [pinglist]: Adds a pinglist to the users requested pings</li>
                        <li>!lping drop [list name] or /lping drop [pinglist]: Removes a pinglist from the users requested pings</li>
                        <li>/lping ping pinglist:[list to ping]: Pings the list [trusted role only - Slash Only]</li>
                        <li>!lping show [list name] or /lping show [pinglist]: Displays an embed with all members of a pinglist [mod only]</li>
                        <li>!lping create [list name] or /lping create [pinglist]: Creates a pinglist that users can join [mod only]</li>
                        <li>!lping delete [list name] or /lping delete [pinglist]: Deletes a pinglist entirely [mod only]</li>
                    
                        <h4><u>Mod Commands</u></h4>
                        
                        <li>/channel disable [cmd]: Disable a command in a single channel</li>
                        <li>/channel enable [cmd]: Enable a command in a single channel</li>
                        <li>/spam add [channel]: Make a channel a spam channel</li>
                        <li>/spam remove [channel]: Remove a channel from being a spam channel</li>
                        <li>/spam view: View all added spam channels</li>
                        <li>/trusted set option:[role]: Make a role trusted by the bot for limited access commands</li>
                        <li>/trusted clear: Clear the trusted role</li>
                        <li>/trusted view: View the trusted role</li>
                        <li>!lrestart or /restart: Restarts the bot</li>

                        <h4><u>Owner Commands</u></h4>

                        <li>/owner ban [user]: Bans a user from the bot</li>
                        <li>/owner unban [user]: Un-Bans a user from the bot</li>
                        <li>/owner enable [cmd]: Enable a command in an entire server</li>
                        <li>/owner disable [cmd]: Enable a command in an entire server</li>
                        <li>/owner reload [cmd]: Reload a command after changes</li>
                        <li>/owner avatar [name]: Changes the bot's avatar</li>
                        <li>/owner say [channeId] [name]: Sends messages to chat as the bot</li>
                        <li>/owner nickname [name]: Changes the bot's nickname</li>
                    </ul>
                </div>
            </div>
        </div>
    </body>
</html>
