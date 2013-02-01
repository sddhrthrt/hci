/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

$(document).ready(function(){
	$currentsong="Agar Tum Mil Jao";
	$currentartist="Shreya Ghoshal";
	$currentalbum="Zeher";

    $(".center").click(function(){
		if($(".area").find(".player").length){
			/*$sign = $(".pause");
			 if($sign.text().replace(/ /g,'')=="||"){
				$sign.html(">");
				$(".player").css("background-image", "url(vis-pause.gif)");
			}
			else{
				$sign.html("||");
				$(".player").css("background-image", "url(vis.gif)");
			}*/
			playAudio();
		}
		else if($(".area").find("#mainmenu").length){
			if($(".active").text()=="Artists"){
				showArtists();
			}
			if($(".active").text()=="Albums"){
				showAlbums();
			}
			if($(".active").text()=="Genres"){
				showGenres();
			}
			if($(".active").text()=="Playlists"){
				showPlaylists();
			}
		}
		
		else if($(".area").find("#playmenu").length){
			if($(".active").text()=="Artists"){
				showArtists();
			}
			if($(".active").text()=="Repeat"){
				showPlayer();
			}
			if($(".active").text()=="Mute"){
				showGenres();
			}
			if($(".active").text()=="Playlists"){
				showPlaylists();
			}
		}
    });
	$("#left-sel").click(function(){
		if($(".area").find(".player")){
			$("#play").text("Back");
			$("#play").attr("id", "back");
			showMainMenu();
		}
	});
	$("#right-sel").click(function(){
		if($(".area").find("#mainmenu").length){
			showPlayer();	
		}
		else if($(".area").find("#artistmenu").length){
			showMainMenu();
		}
		else if($(".area").find("#albummenu").length){
			showMainMenu();
		}
		else if($(".area").find("#genremenu").length){
			showMainMenu();
		}
		else if($(".area").find("#playlistmenu").length){
			showMainMenu();
		}
		else if($(".area").find("#playmenu").length){
			showPlayer();
		}
		else if($(".area").find(".player").length){
			showPlayMenu();
		}
	});
	$("#up").click(function(){
		cur=$(".active");
		if(cur.index()!=0){
			cur.toggleClass("active");
			cur.prev().toggleClass("active");
		}
	});
	$("#down").click(function(){
		cur=$(".active");
		if(cur.index()!=$(".menuitem").length-1){
			cur.toggleClass("active");
			cur.next().toggleClass("active");
		}
	});
	
});

function showMainMenu(){
	menuitems=["Artists", "Albums", "Genres", "Playlists"];
	showList(menuitems, "mainmenu");
}
function showArtists(){
	artists=["Shankar", "AR Rehman", "Alka Yagnik", "Sunidhi Chowhan", 
			"Shreya Ghoshal", "Kishore", "Mukesh", "Jagjit Singh"];
	showList(artists, "artistmenu");
}
function showAlbums(){
	albums=["Taare Zameen Par", "Guru", "Dhoom 2"];
	showList(albums, "albummenu");
}
function showGenres(){
	albums=["Rock", "Punk", "Pop", "Classical", "Indian"];
	showList(albums, "genremenu");
}
function showPlaylists(){
	albums=["Custom", "Melodies", "NightListening", "Soothing", "Senti"];
	showList(albums, "playlistmenu");
}
function showPlayMenu(){
	options = ["Shuffle", "Repeat", "Mute", "Stop After"];
	showList(options, "playmenu");
	$("#play").text("Back");
	$("#play").attr("id", "back");
}
function showList(list, id){
	$(".area").empty();
	$(".area").append("<div id='"+id+"' class='menu'></div>");
	for(var i=0;i<list.length;i++){
		$(".menu").append("<div class='menuitem'>"+list[i]+"</div>");		
	}
	$(".menu").children().eq(0).addClass("active");

}
function showPlayer(){
	$("#back").text("Play");
	$("#back").attr("id", "play");
	$(".area").empty();
	$(".area").append($("#storedplayer").html());
	$(".title").text($currentsong);
	$(".#audio").play();
	
}

function playAudio() {
            // Check for audio element support.
          
                    var oAudio = "horse.ogg"
             		oAudio.play();
            }
