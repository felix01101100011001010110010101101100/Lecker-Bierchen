function dynamischEventInGruppe(){
    $.ajax({
        url:"/gruppen/event",
        type:"GET",
        beforeSend: setAuthentification,
        success: function(data){
            

        }

    })

}