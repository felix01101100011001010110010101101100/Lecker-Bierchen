function dynamischEventInGruppe(gruppenid){
    var inhalt = ""

    // id aus dem Session Storage abrufen. Er wird bei der verification mit abgespeichert
    $.ajax({
        url:"/gruppen/event",
        type:"GET",
        beforeSend: setAuthentification,
        data: {gruppenid: gruppenid},
        success: function(data){
            inhalt = "<section><i class='fa-solid fa-car fa-5x' id='auto'></i><p id='eventname'><b>" + data.eventname + "</b> <b>" + data.ort +"</b> <b>"+data.zeit+"</b> </p>"+
            "<p id='beschreibung'>Beschreibung: "+ data.bemerkung+ "</p><p id='fahrername'> </p>"+
            "<p><button type='submit' class='erstellen' id='dabei'>Bin dabei!</button> <button type='submit' class='erstellen' id='raus5'>Bin raus!</button></p> </section>"


            
        }

    })

}

function eventErstellenButton(){
    $.ajax({
        url:"/event_erstellen.html",
        type:"GET",
        beforeSend: setAuthentification,
        success: function(data){
            $('body').html(data);
        },
    })
}
