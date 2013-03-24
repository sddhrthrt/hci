$(function(){
    //$("#mailbox").sortable({
        //activate: function(e, ui){
            //console.log(ui.offset);
        //},
    //});
    $(".conversation").click(function(e){
        $mail = $(e.target).parent().parent().parent();
        ///implement jquery as soon as you P
        window.location.replace('/conv/'+$mail[0].id);
    });
    $(".delete").click(function(){
        $mail = $(e.target).parent().parent().parent();
        ///implement jquery as soon as you P
        window.location.replace('/d/'+$mail[0].id);

    });

    $(".mail").draggable({
        revert: 'invalid',
        revertDuration: 40,
        drag: function(e, ui){
            if(ui.position.left > 1){
               $(e.target).parent().removeClass("later").addClass("remove");
            }
            else if(ui.position.left < 0){
                $(e.target).parent().removeClass("remove").addClass("later");
            }
        },
        stop: function(e, ui){
            if($(e.target).parent().hasClass("later")){
                showLaterMenu(e.target);
            }
            else{
                deleteItem(e.target);
            }
        }
    });
});
function showLaterMenu(e){
     
}
function deleteItem(e){
    console.log('request to delete')
    $.get('/d/'+e.id).done(function(){ $(e).parent().remove()});
}

