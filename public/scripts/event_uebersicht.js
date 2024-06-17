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
            data.forEach(function(){
                inhalt += "<section id='uebersichtSection'><table id='eventnameUebersicht'><tr><td> <b>Eventname:</b> " + data.eventname + "</td> <td> <b>Ort:</b> " + data.ort + "</td> <td> <b>Zeit:</b> " + data.zeit 
                + "</td><td> <b>Gruppe:</b> "+ data.gruppenname + "</td><td> <b>Fahrer:</b> </td> <tr><td colspan='4' id='beschreibung'>Beschreibung: "+ 
                data.bemerkung + "</td></tr></table> </section>"
            })
            

            $("#uebersichtMain").html(inhalt);



        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })



}