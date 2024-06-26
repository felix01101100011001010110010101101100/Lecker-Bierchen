function dynamischEventUebersicht(){
    // id aus dem Session Storage abrufen. Er wird bei der verification mit abgespeichert
    id = sessionStorage.getItem('id');
    //gruppenid = sessionStorage.getItem('gruppenid');
    $.ajax({
        url: "/eventUebersicht/"+id,
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            //hier muss die Berechnung der Fahrersuche hin
            var inhalt = ""
            console.log(data)
            
            
            data.forEach(function(event){
                console.log(event);
                
                inhalt += "<section id='uebersichtSection'><table id='eventnameUebersicht'><tr><td> <b>Eventname:</b>"+ event.eventname+" </td> <td> <b>Ort:</b> " + event.ort + "</td> <td> <b>Zeit:</b> " + event.zeit 
                + "</td><td> <b>Gruppe:</b> "+ event.gruppenname + "</td><td> <b>Fahrer:</b> "+event.fahrer+"</td><td></td><td></td><td></td><td></td><td><td></td><td></td><td></td><td></td><td></td><td></td><td><i id='eventEntfernen' class='fa-solid fa-xmark'></td> <tr><td colspan='10' id='beschreibung'>Beschreibung: "+ 
                event.bemerkung + "</td></tr></table> </section>";
            })
            $("#uebersichtMain").html(inhalt)
        },
        error: function(error){
            console.error("Error: ", error) 
            alert("Events können nicht angezeigt werden")
        },
    })
}

function eventEntfernen(){
    $.ajax({
        url:"event/loeschen",
        type:"DELETE",
        beforeSend: setAuthentification,
        success:function(data){
            console.log("Event gelöscht")
        },
        error: function(error){
            console.error("Error: ", error) 
            alert("Event konnte nicht entfernt werden")
        },
    })
}

