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
                        <li>!q/!queue: Displays the current song queue [Bots Channel Only]</li>
                        <li>!q/!queue [song]: Adds a song to the current queue [Bots Channel Only]</li>
                        <li>!current: Displays the current song name along side the user who queued it</li>
                        <li>!pc/!playcount [song]: Displays the play count for the specified song</li>
                        <li>!rankplays [num]: Displays a list of length 'num' order by most played (default is 5, max of 25)</li>
                        <li>!recent: Displays the 10 most recently played songs</li>
                        <li>!tracks: Returns a link with all songs available on LHWB</li>
                        
                        <li>!dq/!dequeue [song]: Removes a song from the queue [Trusted Role Only]</li>
                        <li>!cq/!clearqueue: Removes all songs from the current queue [Trusted Role Only]</li>
                        <li>!rejoin: Put's the bot back in it's default voice channel [Trusted Role Only]</li>
                        <li>!lskip: Skips the current song [Trusted Role Only]</li>
                        <li>!lpause: Tells the bot to start playing music [Mod Only]</li>
                        <li>!lresume: Tells the bot to stop playing music [Mod Only]</li>
                        <li>!stage: Put's the bot in server's stage channel [Mod Only]</li>
                    
                        <h4><u>Album Commands</u></h4>
                    
                        <li>!taylorswift/!debut: Displays the track listing for Taylor Swift's Debut album.</li>
                        <li>!beautifuleyes: Displays the track listing for Beautiful Eyes.</li>
                        <li>!fearless: Displays the track listing for Fearless and Fearless (Taylor's Version).</li>
                        <li>!speaknow: Displays the track listing for Speak Now.</li>
                        <li>!red: Displays the track listing for Red and Red (Taylor's Version).</li>
                        <li>!1989: Displays the track listing for 1989.</li>
                        <li>!reputation: Displays the track listing for reputation.</li>
                        <li>!lover: Displays the track listing for Lover.</li>
                        <li>!folklore: Displays the track listing for folklore.</li>
                        <li>!evermore: Displays the track listing for evermore.</li>
                    
                        <h4><u>Tour Commands</u></h4>
                    
                        <li>!redguests: Displays the special guests on The Red Tour.</li>
                        <li>!1989guests: Displays the special guests on the 1989 World Tour.</li>
                        <li>!repguests: Displays the special guests on the reputation Stadium Tour.</li>
                        <li>!redsetlist: Displays The Red Tour typical set list.</li>
                        <li>!1989setlist: Displays the 1989 World Tour typical set list.</li>
                        <li>!repsetlist: Displays the reputation Stadium Tour typical set list.</li>
                        <li>!1989ss: Private messages user the complete list of 1989 World Tour secret songs.</li>
                        <li>!repss: Private messages user the complete list of reputation Stadium Tour secret songs.</li>
                    
                        <h4><u>Misc Commands</u></h4>
                    
                        <li>!countdown: provides an embed of relevant Taylor countdowns.</li>
                        <li>!danc: replies :thinking:.</li>
                        <li>!debtcounter: displays WetPatootie's current oof debt.</li>
                        <li>!eyeroll: replies :rolling_eyes:.</li>
                        <li>!gif: replies with a random Taylor gif.</li>
                        <li>!lhelp: help lookup tool, as well as this website.</li>
                        <li>!prefix: replies with the bot's prefix in that server</li>
                        <li>!request [gif/album/song]: Logs a user's request for a bot feature or song/gif etc.</li>
                        <li>!stream/!livestream: information regarding the stream server.</li>
                        <li>!taze: replies with a lightning emoji.</li>
                        <li>!wtf: replies with a random !g wtf[#].</li>
                        <li>!wtny: sends the welcome to discord skyline gif.</li>
                        <li>!lversion: current version of the bot.</li>
                    
                        <h4><u>Last FM Commands</u></h4>
                    
                        <li>!lfm: displays an embed of your profile if set.</li>
                        <li>!lfm [user]: displays an embed of @user's profile if set.</li>
                        <li>!lfm search [lastfm_user]: displays an embed of a requested lastfm user.</li>
                        <li>!lfm set [lastfm_user]: sets your lastfm profile.</li>
                        <li>!lfm clear: clears your lastfm profile.</li>
                    
                        <h4><u>Pinglist Commands</u></h4>
                    
                        <li>!lping: Displays the pinglists you're on</li>
                        <li>!lping list: Displays the available pinglists</li>
                        <li>!lping get [list name]: Adds a pinglist to the users requested pings</li>
                        <li>!lping drop [list name]: Removes a pinglist from the users requested pings</li>
                        <li>!lping [list to ping]: Pings the list [trusted role only]</li>
                        <li>!lping show [list name]: Displays an embed with all members of a pinglist [mod only]</li>
                        <li>!lping create [list name]: Creates a pinglist that users can join [mod only]</li>
                        <li>!lping delete [list name]: Deletes a pinglist entirely [mod only]</li>
                    
                        <h4><u>Mod Commands</u></h4>
                    
                        <li>!botban [user]: Bans a user from the bot</li>
                        <li>!botunban [user]: Un-Bans a user from the bot</li>
                        <li>!channel disable [cmd]: Disable a command in a single channel</li>
                        <li>!channel enable [cmd]: Enable a command in a single channel</li>
                        <li>!spam add [channel]: Make a channel a spam channel</li>
                        <li>!spam remove [channel]: Remove a channel from being a spam channel</li>
                        <li>!trusted set [role]: Make a role trusted by the bot for limited access commands</li>
                        <li>!trusted clear: Clear the trusted role</li>
                        <li>!lrestart: restarts the bot</li>
                    </ul>
                </div>
            </div>
        </div>
    </body>
</html>
