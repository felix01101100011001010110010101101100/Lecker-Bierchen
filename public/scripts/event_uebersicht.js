function dynamischEventUebersicht(){
    var inhalt = ""
    $.ajax({
        url: "/eventUebersicht",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            //hier muss die Berechnung der Fahrersuche hin
            console.log(data);

            var inhalt = ""
            data.forEach(function(event){
                inhalt += "<section id='uebersichtSection'><table id='eventnameUebersicht'><tr><td> <b>Eventname:</b>"+ event.eventname+" </td> <td> <b>Ort:</b> " + event.ort + "</td> <td> <b>Zeit:</b> " + event.zeit 
                + "</td><td> <b>Gruppe:</b> "+ event.gruppenname + "</td><td> <b>Fahrer:</b> </td> <tr><td colspan='4' id='beschreibung'>Beschreibung: "+ 
                event.bemerkung + "</td></tr></table> </section>";
            })
            

            $("#uebersichtMain").html(inhalt);



        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })



}