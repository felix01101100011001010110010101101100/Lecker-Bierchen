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
    var pruefung = 0
    var listeTeilnehmer = []
    var fahrer = ""
    console.log(eventid)
    
    $.ajax({
        url:"/gruppe/gruppenadmin",
        type:"GET",
        beforeSend: setAuthentification,
        data: {gruppenid: sessionStorage.getItem('gerade_in_gruppen_id')},
        success: function(data){
            if (sessionStorage.getItem('id') == data){
                pruefung = 1
            }
            else{
                alert("Kein Zugriff. Diese Funktion hat nur der Administrator!!!!")
            }
        },
        error: function(error){
            console.error("Error: ", error)
            alert("Keine Fahrersuche möglich")
        },
        
    })

    .then($.ajax({
        url:"/event/loeschen",
        type:"DELETE",
        data: {eventId:eventId},
        beforeSend: setAuthentification,
        success: function(data){
            console.log("Event wurde erfolgreich gelöscht");
        },
        error: function(error){
            console.error("Error ",error);
            alert("Seite konnte nicht neu geladen werden")
        },

        

    }))
}