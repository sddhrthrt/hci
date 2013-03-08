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
<<<<<<< HEAD
    function showMenu($this){
        $("#edit-icon").animate({opacity: 0.2}, 10);
        $(".pulldown").remove();
        $("<div>").addClass("pulldownmenu").appendTo(".editor");
        var items = ["Brightness", "Saturation",
                    "Exposure", "Sepia",
                    "Noise", "Contrast",
                    "Vibrance", "Hue",
                    "Gamma", "Clip"];
        var list = $("<div>").addClass("menuitems");
        for(var item in items){
            list.append($("<div class='menuitem rangeeffect'>"+items[item]+"</div>").attr("id", items[item]));
        }
        $("<div>").addClass("saveclosemenu menuitem").append("<i class='icon-ok'></i>").appendTo(list);
        $("<div>").addClass("closemenu menuitem").append("<i class='icon-undo'></i>").appendTo(list);
        list.appendTo('.pulldownmenu');
        $(".rangeeffect").mouseover(function(){
            var $this = $(this),
                $id = $this.attr("id"),
                $range = $this.children({id: $id});
            $this.siblings().each(function(){
                $(this).children(".rangeholder").remove();
            })
            if($range.length==0){
                $this.append("<div class='rangeholder'><input type='range' id="+$id+"range></div>");
            }
        });
        $(".saveclosemenu").click(function(){
            $(".pulldownmenu").remove();
            showMenuButton();
        });
        $(".closemenu").click(function(){
            $(".pulldownmenu").remove();
            showMenuButton();
        });

    }
    function showMenuButton(){
        $("<div>").addClass("pulldown").appendTo(".editor");
        $("<i class='icon-edit' id='edit-icon'></i>").appendTo(".pulldown");
        $(".pulldown").click(function(event){
            showMenu();
        });
    }
	function edit($item){
		$("<div class='editor'></div>").appendTo($(".screen"));
		$(".gallery").hide();
		var src = $item.attr("href");
		$("<img>").addClass("editable").attr("src", src).appendTo(".editor");
        showMenuButton();
=======
	function edit($item){
		$("<div class='editor'></div>").hide().appendTo($(".screen")).show("400");
		$(".gallery").hide("400");
		var src = $item.attr("href");
		$("<img>").addClass("editable").attr("src", src).appendTo(".editor");
		setTimeout(function(){
			$("<div>").addClass("pulldown").appendTo(".editor").hide().fadeIn(400);
			$("<i class='icon-edit' id='edit-icon'></i>").appendTo(".pulldown");

			var items = ["Brightness", "Saturation",
						"Exposure", "Sepia",
						"Noise", "Contrast", 
						"Vibrance", "Hue",
						"Gamma", "Clip"];
			var list = $("<div>").addClass("menuitems");
			for(var item in items){
				list.append($("<div class='menuitem'>"+items[item]+"</div>").attr("id", items[item]));
			}
			list.appendTo('body');
			var menuheight= list.height();

			$(".pulldown").click(function(event){
				$(this).switchClass("pulldown", "pulldownmenu",{ height: menuheight+40}, 800);
				$(this).animate({ height: menuheight+40});
				$("#edit-icon").animate({opacity: 0.2}, 1000);

				setTimeout(function(){
					list.appendTo(".pulldownmenu");

				}, 800);
			});
			
		}, 400);
>>>>>>> 01b3dede3b81e19b4eb1c5c327ea0ea56d424e41
	}
	$(".thumbnail").click(function(event){
		var $item = $(this),
			$target = $(event.target);

		if($target.is(".edit")){
			edit($item);
		}
	});

});

