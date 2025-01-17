// ==UserScript==
// @name        Blackpearl IMDB 
// @version     1.1.0
// @description Template Maker
// @author      NotLaxudope
// @include     https://blackpearl.biz/forums/204/post-thread
// @include     https://blackpearl.biz/forums/183/post-thread
// @include     https://blackpearl.biz/forums/184/post-thread
// @include     https://blackpearl.biz/forums/172/post-thread
// @include     https://blackpearl.biz/forums/173/post-thread
// @include     https://blackpearl.biz/forums/174/post-thread
// @include     https://blackpearl.biz/forums/176/post-thread
// @include     https://blackpearl.biz/forums/178/post-thread
// @include     https://blackpearl.biz/forums/179/post-thread
// @include     https://blackpearl.biz/forums/180/post-thread
// @include     https://blackpearl.biz/forums/181/post-thread
// @include     https://blackpearl.biz/forums/182/post-thread
// @include     https://blackpearl.biz/forums/202/post-thread
// @include     https://blackpearl.biz/forums/129/post-thread
// @require     https://code.jquery.com/jquery-3.2.1.min.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// ==/UserScript==

const APIKEY = "OMDB_API_KEY_GOES_HERE"

$("body").append ( '                                                          \
    <div id="gmPopupContainer">                                               \
    <form> <!-- For true form use method="POST" action="YOUR_DESIRED_URL" --> \
        <input type="text" id="myNumber1" value="" class="input" placeholder="Enter Youtube Trailer Link">                           \
        <input type="text" id="myNumber2" value="" class="input" placeholder="Enter Download Link">                           \
        <input type="text" id="myNumber3" value="" class="input" placeholder="Enter IMDB ID i.e tt0416449">                                                                      \
        <p id="myNumberSum">&nbsp;</p>                                        \
        <button id="gmAddNumsBtn" class="button--primary button button--icon button--icon--login rippleButton" type="button">Generate Template</button>  \
        <button id="gmCloseDlgBtn" class="button--primary button button--icon button--icon--login rippleButton" type="button">Close popup</button>         \
    </form>                                                                   \
    </div>                                                                    \
' );


//--- Use jQuery to activate the dialog buttons.
$("#gmAddNumsBtn").click ( function () {
    var uToob   = $("#myNumber1").val ();
    var ddl   = $("#myNumber2").val ();
    var IID   = $("#myNumber3").val ();
GM_xmlhttpRequest({
method: "GET",
url: "http://www.omdbapi.com/?apikey="+APIKEY+"&i="+IID+"&plot=full&y&r=json",
onload: function(response) {
  
var json = JSON.parse(response.responseText);
    var title = json.Title;
    var year = json.Year;
    var rated = json.Rated;
    var released = json.Released;
    var runtime = json.Runtime;
    var genre = json.Genre;
    var director = json.Director;
    var writer = json.Writer;
    var actors = json.Actors;
    var plot = json.Plot;
    var poster = json.Poster;
    var rating = json.imdbRating;
    var imdb_id = json.imdbID;
    var imdbvotes = json.imdbVotes;
    var production = json.Production;
    var dump = "[center][img]" + poster + "[/img]\n"
    dump += "[color=rgb(250, 197, 28)][b][size=6]"+title+" ("+year+")[/size][/b][/color]\n"
    dump += "[url=https://www.imdb.com/title/"+imdb_id+"][img]https://i.imgur.com/rcSipDw.png[/img][/url][size=6][b] "+rating+"[/b]/10[/size]\n"
    dump += "[size=6][img]https://i.imgur.com/sEpKj3O.png[/img]"+imdbvotes+"[/size][/center]\n"
    dump += "[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Plot[/b][/color][/size][/indent]\n\n"
    dump += plot
    dump += "[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Trailer[/b][/color][/size][/indent]\n\n"
    dump += "[media=youtube]"+uToob.split("v=")[1]+"[/media]\n"
    dump += "[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Movie Info[/b][/color][/size][/indent]\n\n"
    dump += "[LIST][*][B]Rating: [/B]"+rated+"\n"
    dump += "[*][B]Genre: [/B] "+genre+"\n"
    dump += "[*][B]Directed By: [/B] "+director+"\n"
    dump += "[*][B]Written By: [/B] "+writer+"\n"
    dump += "[*][B]Starring: [/B] "+actors+"\n"
    dump += "[*][B]Release Date: [/B] "+released+"\n"
    dump += "[*][B]Runtime: [/B] "+runtime+"\n"
    dump += "[*][B]Production: [/B] "+production+"\n"    
    dump += "[hr][/hr][center][size=6][color=rgb(250, 197, 28)][b]Download Link[/b][/color][/size][/center]\n\n"
    dump += "[center][hidereactscore=5][hidereact=1,2,3,4,5,6][DOWNCLOUD]"+ddl+"[/DOWNCLOUD][/hidereact][/hidereactscore][/center]\n"
    GM_setClipboard (dump);
    $("#myNumberSum").text ("Copied to clipboard! Just paste on Blackpearl.biz");
}});
});

$("#gmCloseDlgBtn").click ( function () {
    $("#gmPopupContainer").hide ();
} );


//--- CSS styles make it work...
GM_addStyle ( "                                                 \
    #gmPopupContainer {                                         \
        position:               fixed;                          \
        top:                    60%;                            \
        left:                   70%;                            \
        padding:                2em;                            \
        background:             #42464D;                     \
        border:                 3px double black;               \
        border-radius:          1ex;                            \
        z-index:                777;                            \
    }                                                           \
    #gmPopupContainer button{                                   \
        cursor:                 pointer;                        \
        margin:                 1em 1em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
" );
