$(document).ready(function(){
    $(".center").click(function(){
		if($(".area").find(".player")){
			$sign = $(".pause");
			if($sign.text().replace(/ /g,'')=="||"){
			 $sign.html(">");
			}
			else{
				$sign.html("||");
			}
		}
    });
	$("#left-sel").click(function(){
		$(".area").empty();
		$(".area").append("<div class='menu'></div>");
		menuitems=["Artists", "Albums", "Genre", "Playlist"];
		for(var i=0;i<menuitems.length;i++){
			$(".menu").append("<div class='menuitem'>"+menuitems[i]+"</div>");		
		}
		$(".menu").children().eq(0).addClass("active");
	});
	$("#up").click(function(){
		cur=$(".menu").children().filter(".active");
		if(cur.index()!=0){
			cur.toggleClass("active");
			cur.prev().toggleClass("active");"
		}
	});
	$("#down").click(function(){
		cur=$(".menu").children().filter(".active");
		if(cur.index()!=-1){
			cur.toggleClass("active");
			cur.next().toggleClass("active");
		}
	});
	
});


