function dynamischEventUebersicht(){
    var inhalt = ""
    $.ajax({
        url: "/eventUebersicht",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            //hier muss die Berechnung der Fahrersuche hin
            console.log(data);

            var inhalt = "<section id='uebersichtSection'><table id='eventnameUebersicht'><tr><td>"+ data.eventname + "</td> <td>"+ data.ort +"</td> <td>"+ data.zeit 
            +"</td><td> Gruppe: "+ data.gruppenname + "</td><td> Fahrer:</td> <tr><td id='beschreibung'>Beschreibung: "+ 
            data.bemerkung + "</td></tr></table> </section>"

            $("#uebersichtMain").html(inhalt);



        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })



}