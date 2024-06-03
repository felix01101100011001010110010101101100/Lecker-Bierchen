function dynamischEventUebersicht(){
    var inhalt = ""
    $.ajax({
        url: "/eventUebersicht",
        type: "GET",
        beforeSend: setAuthentification, //könnte nicht funktionieren, da die Funktion vlt. nicht erreichbar ist
        success: function(data){
            var inhalt = "<section id='uebersichtSection'><p id='eventnameUebersicht'><b>"+ data.eventname + "</b> <b> "+ data.ort +"</b> <b>"+ data.zeit 
            +"</b> <b>Gruppe: "+ data.gruppenname + "</b> <b>Fahrer: " + Name +" </b></p><p id='beschreibung'>Beschreibung: "+ 
            data.bemerkung + "</p> </section>"



        }
    })



}