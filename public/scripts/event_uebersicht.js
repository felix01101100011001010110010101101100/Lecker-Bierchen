function dynamischEventUebersicht(){
    var inhalt = ""
    $.ajax({
        url: "/eventUebersicht",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            //hier muss die Berechnung der Fahrersuche hin
            console.log(data);

            var inhalt = "<section id='uebersichtSection'><p id='eventnameUebersicht'><b>"+ data.eventname + "</b> <b> "+ data.ort +"</b> <b>"+ data.zeit 
            +"</b> <b>Gruppe: "+ data.gruppenname + "</b> <b>Fahrer: </b></p><p id='beschreibung'>Beschreibung: "+ 
            data.bemerkung + "</p> </section>"

            $("#uebersichtMain").html(inhalt);



        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })



}