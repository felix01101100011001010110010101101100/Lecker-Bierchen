function dynamischEventUebersicht(){
    var inhalt = ""
    $.ajax({
        url: "/eventUebersicht",
        type: "GET",
        beforeSend: setAuthentification, //könnte nicht funktionieren, da die Funktion vlt. nicht erreichbar ist
        success: function(data){
            var inhalt = "<section id='uebersichtSection'><p id='eventnameUebersicht'><b>"+ Name + "</b> <b> "+ Ort +"</b> <b>"+ Uhrzeit 
            +"</b> <b>Gruppe: "+ Gruppenname + "</b> <b>Fahrer: " + Name +" </b></p><p id='beschreibung'>Beschreibung: "+ 
            Text + "</p> </section>"



        }
    })



}