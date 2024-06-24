function dynamischEventUebersicht(){
    var inhalt = ""
    // id aus dem Session Storage abrufen. Er wird bei der verification mit abgespeichert
    id = sessionStorage.getItem('id');
    $.ajax({
        url: "/eventUebersicht",
        type: "GET",
        beforeSend: setAuthentification,
        data: {id: id},
        success: function(data){
            //hier muss die Berechnung der Fahrersuche hin
            console.log(data);
            var inhalt = ""
            data.forEach(function(event){
                inhalt += "<section id='uebersichtSection'><table id='eventnameUebersicht'><tr><td> <b>Eventname:</b>"+ event.eventname+" </td> <td> <b>Ort:</b> " + event.ort + "</td> <td> <b>Zeit:</b> " + event.zeit 
                + "</td><td> <b>Gruppe:</b> "+ event.gruppenname + "</td><td> <b>Fahrer:</b> </td><td></td><td></td><td></td><td></td><td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></td><td></td><td><i id='eventEntfernen' class='fa-solid fa-xmark'></td> <tr><td colspan='10' id='beschreibung'>Beschreibung: "+ 
                event.bemerkung + "</td></tr></table> </section>";
            })
            //Fahrersuche: alle Namen in der Datenbank ausgegeben, die an dem Event teilnehmen (count(*) benutzen, aber wir ruft man 
            //die auf???)und dann in eine Liste packen und dann
            //einen Zufallszahlengenerator anwenden und die Person, die an dieser Stelle steht muss fahren
            
            $("#uebersichtMain").html(inhalt);
        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })
}


function loeschenEvent(){
    $.ajax({
        url:"loeschen/EventUebersicht",
        type:"DELETE",
        beforeSend: setAuthentification,
        success:function(){
            console.log("Event gelöscht")
        }
    })
}