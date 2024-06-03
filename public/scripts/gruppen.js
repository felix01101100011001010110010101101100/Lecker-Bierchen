function dynamischEventInGruppe(){
    var inhalt = ""
    $.ajax({
        url:"/gruppen/event",
        type:"GET",
        beforeSend: setAuthentification,
        success: function(data){
            inhalt = "<section><i class='fa-solid fa-car fa-5x' id='auto'></i><p id='eventname'><b>" + Name + "</b> <b>" + Ort +"</b> <b>"+Uhrzeit+"</b> </p>"+
            "<p id='beschreibung'>Beschreibung: "+ Beschreibung+ "</p><p id='fahrername'> "+Mustermann+"</p>"+
            "<p><button type='submit' class='erstellen' id='dabei'>Bin dabei!</button> <button type='submit' class='erstellen' id='raus5'>Bin raus!</button></p> </section>"


            
        }

    })

}