<?php require_once('includes/header.php'); ?>
            <style>
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
                #ad {
                    width: 250px;
                }
                .adBox {
                    display: flex;
                    justify-content: space-around;
                }
                .item {
                    padding: 10px;
                    background-color: #63377f;
                    margin: 5px;
                    border-radius: 5px;
                }
            </style>

            <div class="container-fluid">
                <div id="commands">
                    <div class="adBox">
                        <div class="item">
                            <a href="https://termius.com/"><img src="/includes/images/termius-icon-64.png" alt="Termius Logo"></a>
                            <h4><a href="https://termius.com/">Termius</a> provides a secure, reliable, and collaborative SSH client.</h4>
                        </div>
                        <div class="item">
                            <a href="https://www.benjibot.xyz/"><img src="/includes/images/benji.png" alt="BenjiBot Logo" width="64px"></a>
                            <h4><a href="https://www.benjibot.xyz/">BenjiBot</a> A multi-purpose Discord bot designed to help improve your server with moderation, saves, last.fm, and more.</h4>
                        </div>
                    </div>
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
                        <li>/album the-tortured-poets-department: Displays the track listing for The Tortured Poets Department.</li>
                        <li>/album the-life-of-a-showgirl: Displays the track listing for The Life of a Showgirl.</li>
                    
                        <h4><u>Tour Commands</u></h4>
                    
                        <li>/tour red guests: Displays the special guests on The Red Tour.</li>
                        <li>/tour red setlist: Displays The Red Tour typical set list.</li>
                        <li>/tour 1989 guests: Displays the special guests on the 1989 World Tour.</li>
                        <li>/tour 1989 setlist: Displays the 1989 World Tour typical set list.</li>
                        <li>/tour 1989 surprise-songs: Displays the complete list of 1989 World Tour surprise songs.</li>
                        <li>/tour reputation guests: Displays the special guests on the reputation Stadium Tour.</li>
                        <li>/tour reputation setlist: Displays the reputation Stadium Tour typical set list.</li>
                        <li>/tour reputation surprise-songs: Displays the complete list of reputation Stadium Tour surprise songs.</li>
                        <li>/tour eras surprise-songs: Displays the complete list of The Eras Tour surprise songs.</li>
                        <li>/tour eras setlist: Displays The Eras Tour typical set list.</li>
                        <li>/tour schedule: Displays the upcoming tour shows.</li>
                    
                        <h4><u>Misc Commands</u></h4>
                    
                        <li>/countdown: provides an embed of relevant Taylor countdowns.</li>
                        <li>/gif: replies with a random gif.</li>
                        <li>/version: current version of the bot.</li>
                        <li>/request [type] [feature]: Logs a user's request for a bot feature or song/gif etc.</li>
                        <li>/wtf: replies with a random !g wtf[#].</li>
                    
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
                    </ul>
                </div>
            </div>
        </div>
    </body>
</html>
