function eventDabei(eventid){
    var personid = sessionStorage.getItem("id");
    console.log(personid)
    //damit das in event übersicht angezeigt wird
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
    //in Eventübersicht switchen
    .then($.ajax({
        url: "/event_uebersicht.html",
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

async function eventLoeschen(eventid){
    var pruefung = 0
    console.log(eventid)
    //Admin überprüfen
    
    const admin = await $.ajax({
        url:"/gruppe/gruppenadmin",
        type:"GET",
        beforeSend: setAuthentification,
        data: {gruppenid: sessionStorage.getItem('gerade_in_gruppen_id')},
        success: function(data){
            if (sessionStorage.getItem('id') == admin){
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

    
    //Event löschen
    const loeschen = await $.ajax({
        url:"/event/loeschen",
        type:"DELETE",
        data: {eventid:eventid},
        beforeSend: setAuthentification,
        success: function(data){
            console.log("Event wurde erfolgreich gelöscht");
        },
        error: function(error){
            console.error("Error ",error);
            alert("Seite konnte nicht neu geladen werden")
        },


    })
    //Seite neu laden nach dem löschen
    const neueSeite = await ($.ajax({
        url: "/gruppen.html",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            console.log("Data"+data)
            $("body").html(data)
        },
        error: function(error){
            console.error("Error ", error);
            alert("Seite konnte nicht geladen werden");
        },
    }));
    
}
