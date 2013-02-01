/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

$(document).ready(function(){
	$currentsong=0;
	$currentartist=0;
	$currentalbum=0;
	$artists = ["Sonu Nigam", "A R Rehman", "Wasifuddin Dagar",
			"Lata Mangeshkar", "Zulfi", "Sunidhi Chowhan"];
	$albums = ["Taare zameen Par", "Lagaan", "Metro", "RHTDM",
			"KKKG", "Indian", "Bombay"];
	$songs = ["Maa", "Taare", "Yeh taara", "Ya Ali", "Disco",
		"Dil me", "Dil se", "Bin Tere", "Maula Maula"];
	$currentvolume = 6;
	$maxvolume = 6;
	showPlayer();

    $(".center").click(function(){
		if($(".area").find(".player").length){
			playPause();
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
		else if($(".area").find("#artistmenu").length){
			$currentartist = $(".active").index();
			showSongs();
		}
		else if($(".area").find("#albummenu").length){
			$currentalbum = $(".active").index();
			showSongs();
		}
		else if($(".area").find("#genremenu").length){
			showAlbums();
		}
		else if($(".area").find("#songmenu").length){
			$currentsong = $(".active").index();
			showPlayer();
		}
		else if($(".area").find("#playmenu").length){
			$option = $(".active").index();
			switch($option){
				case 1:
					setShuffle();
					break;
				case 2:
					setRepeat();
					break;
				case 3:
					if($currentvolume==0){
						$currentvolume=$maxvolume;
					}
					else{
						$currentvolume = 0;
					}
					break;
			}
			showPlayer();
		}
    });
	$("#left-sel").click(function(){
		if($(".area").find(".player").length){
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
		else if($(".area").find("#songmenu").length){
			showPlayer();
		}
		else if($(".area").find(".player").length){
			showPlayMenu();
		}
	});
	$("#up").click(function(){
		if($(".area").find(".player").length){
			if($currentvolume<$maxvolume){
				$currentvolume+=1;
				showPlayer();
			}
		}
		cur=$(".active");
		if(cur.index()!=1){
			cur.toggleClass("active");
			cur.prev().toggleClass("active");
		}
	});
	$("#down").click(function(){
		if($(".area").find(".player").length){
			if($currentvolume>0){
				$currentvolume-=1;
				showPlayer();
			}
		}
		cur=$(".active");
		if(cur.index()!=$(".menuitem").length-1){
			cur.toggleClass("active");
			cur.next().toggleClass("active");
		}
	});
	$("#right").click(function(){
		if($(".area").find(".player")){
			playNext();
		}	
	});
	$("#left").click(function(){
		if($(".area").find(".player")){
			playPrev();
		}	
	});
	$("#5").click(function(){
		playPause();	
	});
	$("#6").click(function(){
		playNext();
	});
	$("#4").click(function(){
		playPrev();
	});
	$("#star").click(function(){
		setShuffle();
	});
	$("#hash").click(function(){
		setRepeat();
	});
	$("#0").click(function(){
		mute();
	});

});

function showMainMenu(){
	menuitems=["Artists", "Albums", "Genres", "Playlists"];
	showList(menuitems, "mainmenu", "Main Menu");
}
function showArtists(){
	showList($artists, "artistmenu", "Artists");
}
function showAlbums(){
	showList($albums, "albummenu", "Albums");
}
function showSongs(){
	showList($songs, "songmenu", "Tracks");
}
function showGenres(){
	albums=["Rock", "Punk", "Pop", "Classical", "Indian"];
	showList(albums, "genremenu", "Genres");
}
function showPlaylists(){
	albums=["Custom", "Melodies", "NightListening", "Soothing", "Senti"];
	showList(albums, "playlistmenu", "Playlists");
}
function showPlayMenu(){
	options = ["Shuffle", "Repeat", "Mute", "Stop After"];
	if($currentvolume==0){
		options[2]="Unmute";
	}
	showList(options, "playmenu", "Options");
	$("#play").text("Back");
	$("#menu").text("'");
	$("#play").attr("id", "back");
}
function showList(list, id, title){
	$(".area").empty();
	$(".area").append("<div id='"+id+"' class='menu'></div>");
	$(".menu").append("<div class='menu-head'>"+title+"</div>");
	for(var i=0;i<list.length;i++){
		$(".menu").append("<div class='menuitem'>"+list[i]+"</div>");		
	}
	$(".menu").children().eq(1).addClass("active");

}
function addVolume(){
	vol = "";
	for(var i=0;i<$currentvolume;i++){
		vol+="|";
	}
	for(var i=0;i<$maxvolume-$currentvolume;i++){
		vol+=".";
	}
	$(".volume").text(vol);
}
function showPlayer(){
	$("#back").text("Options");
	$("#back").attr("id", "play");
	$("#menu").text("Menu");
	$(".area").empty();
	$(".area").append($("#storedplayer").html());
	addVolume();
	$("#title").text($songs[$currentsong]);
	$("#artist").text($artists[$currentartist]);
}
function playPause(){
	$sign = $(".pause");
	if($sign.text().replace(/ /g,'')=="||"){
		$sign.html(">");
		$(".player").css("background-image", "url(vis-pause.gif)");
	}
	else{
		$sign.html("||");
		$(".player").css("background-image", "url(vis.gif)");
	}
}
function playNext(){
	if($currentsong < $songs.length){
		$currentsong += 1;
	}
	if($currentartist < $artists.length){
		$currentartist += 1;
	}
	if($currentalbum < $albums.length){
		$currentalbum += 1;
	}
	showPlayer();
}
function playPrev(){
	if($currentsong > 0){
		$currentsong -= 1;
	}
	if($currentartist > 0){
		$currentartist -= 1;
	}
	if($currentalbum > 0){
		$currentalbum -= 1;
	}
	showPlayer();
}
function setShuffle(){
	if($(".mode").text()!=String.fromCharCode(8734)){
		$(".mode").text(String.fromCharCode(8734));
	}
	else{
		$(".mode").text(String.fromCharCode(""));
	}
}
function setRepeat(){
	if($(".mode").text()!=String.fromCharCode(0x21A9)){
		$(".mode").text(String.fromCharCode(0x21A9));
	}
	else{
		$(".mode").text("");
	}
}
function mute(){
	if($currentvolume){
		$currentvolume=0;
	}else{
		$currentvolume=$maxvolume;
	}
	showPlayer();
}
