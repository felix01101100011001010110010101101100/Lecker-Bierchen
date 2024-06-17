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

            var inhalt = "<section id='uebersichtSection'><table id='eventnameUebersicht'><tr><td>Eventname: "+ data.eventname + "</td> <td>Ort: "+ data.ort +"</td> <td>Zeit: "+ data.zeit 
            +"</td><td> Gruppe: "+ data.gruppenname + "</td><td> Fahrer:</td> <tr><td colspan='4' id='beschreibung'>Beschreibung: "+ 
            data.bemerkung + "</td></tr></table> </section>"

            $("#uebersichtMain").html(inhalt);



        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })



}