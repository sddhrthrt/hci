/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

$(function(){
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    $(".thumbnail").each(function(index){
        $(this).append('<span class="edit ui-icon ui-icon-pencil pull-right"></span>');
    });
        /*creating menu*/
         var items = ["Brightness", "Saturation", "Exposure", "Sepia",
						"Noise", "Contrast", 
						"Vibrance", "Hue",
						"Gamma"];
        var area_items = ["Clip", "Set Area"];
			var list = $("<div>").addClass("menuitems");
			for(var item in items){
				list.append($("<div class='menuitem rangename'>"+items[item]+"</div>").attr("id", items[item]));
			}
			for(var item in area_items){
				list.append($("<div class='menuitem areaname'>"+area_items[item]+"</div>").attr("id", area_items[item]));
			}
			list.append($("<div class='menuitem'></div>").attr("id", "back"));
			list.append($("<div class='menuitem'></div>").attr("id", "ok"));
			list.hide().appendTo('body');
           $("<i class='icon-undo'></i>").appendTo("#back");
            $("<i>").addClass("icon-ok").appendTo("#ok");
        /* finished creating menu*/
	function edit($item){
		$("<div class='editor'></div>").hide().appendTo($(".screen")).show("400");
		$(".gallery").hide("400");
		var src = $item.attr("href");
		$("<img>").addClass("editable").attr("src", src).appendTo(".editor");
        function showMenu(){
			var list = $(".menuitems"),
                menuheight= list.height(),
                $pulldown = $(".pulldown"); 
            if($pulldown.length) $pulldown.remove();
            $("<div>").addClass("pulldownmenu").appendTo(".editor");
            $(".pulldownmenu").animate({ height: menuheight});
            setTimeout(function(){
                    list.appendTo(".pulldownmenu").show();
                    $(".rangename").click(function(){
                        $rangetype=$(this).text();
                        $(".pulldownmenu").hide();
                        $("<div>").addClass("floatingbox").attr("id", "rangeselectbox").appendTo(".editor");
                        $("<div>"+$rangetype+"</div>").addClass("rangetype").appendTo("#rangeselectbox");
                        $("<input type='range'>").addClass("rangewidget").appendTo("#rangeselectbox");
                        $("<div><i class='icon-ok'></div>").attr("id", "rangeok").appendTo("#rangeselectbox");
                        $("#rangeselectbox").draggable();
                        $("#rangeok").click(function(){
                            $(this).parent().remove();
                            $(".pulldownmenu").show();
                        });
                    });
                    $(".areaname").click(function(){
                        $(".pulldownmenu").hide();
                        $("<div>").attr("id", "areabox").appendTo(".editor");
                        $("#areabox").resizable();
                        $("#areabox").draggable();
                        $("#areabox").click(function(){
                            $(this).remove();
                            $(".pulldownmenu").show();
                        });
                    });
                $("#back").click(function(){
                    $(".pulldownmenu").hide();
                    $("<div>").addClass("pulldown").appendTo(".editor").hide().fadeIn(400);
                    $("<i class='menu-icon icon-edit' id='edit-icon'></i>").appendTo(".pulldown");
                    $("<i class='menu-icon icon-arrow-left' id='back-icon'></i>").appendTo(".pulldown");
                    $("#edit-icon").click(function(event){
                        $(".pulldown").remove();
                        $(".pulldownmenu").show();
                    });
                    $("#back-icon").click(function(event){
                        $(".editor").remove();
                        $(".gallery").show();
                    });
                });
                $("#ok").click(function(){
                    $(".pulldownmenu").hide();
                    $("<div>").addClass("pulldown").appendTo(".editor").hide().fadeIn(400);
                    $("<i class='menu-icon icon-edit' id='edit-icon'></i>").appendTo(".pulldown");
                    $("<i class='menu-icon icon-arrow-left' id='back-icon'></i>").appendTo(".pulldown");
                    $("#edit-icon").click(function(event){
                        $(".pulldown").remove();
                        $(".pulldownmenu").show();
                    });
                    $("#back-icon").click(function(event){
                        $(".editor").remove();
                        $(".gallery").show();
                    });
                });
            }, 800);

        }

		setTimeout(function(){
			$("<div>").addClass("pulldown").appendTo(".editor").hide().fadeIn(400);
			$("<span class='hint' data-hint='Edit Image'><i class='menu-icon icon-edit' id='edit-icon'></i></span>").appendTo(".pulldown");
			$("<span class='hint' data-hint='Gallery'><i class='menu-icon icon-arrow-left' id='back-icon'></i></span>").appendTo(".pulldown");
			$("#edit-icon").click(function(event){
                showMenu();
			});
            $("#back-icon").click(function(event){
                $(".editor").remove();
                $(".gallery").show();
            });
		}, 400);
	}
	$(".thumbnail").click(function(event){
		var $item = $(this),
			$target = $(event.target);

		if($target.is(".edit")){
			edit($item);
		}
	});

});

