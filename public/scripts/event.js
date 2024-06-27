function eventDabei(eventid){
    var personid = sessionStorage.getItem("id");
    $.ajax({
        url:"/event/dabei",
        type:"POST",
        beforeSend: setAuthentification,
        data: {personid:personid, eventid:eventid},
        success:function(){
            console.log("funktioniert");
        },
        error: function(error) {
            console.error("Error: ", error);
            alert('Du konntest dich nicht zum Event anmelden');
        }

    })
    .then($.ajax({
        url: "/events_uebersicht.html",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            $("body").html(data)
        },
        error: function(error){
            console.error("Error ", error);
            alert("Seite konnte nicht geladen werden");
        },
    }))
}

function eventLoeschen(eventId){
    $.ajax({
        url:"/event/loeschen",
        type:"DELETE",
        data: {eventId:eventId},
        beforeSend: setAuthentification,
        success: function(data){

        }
        
        

    })
}