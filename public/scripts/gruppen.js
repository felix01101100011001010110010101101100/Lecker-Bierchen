function gruppenName(){  
    var inhalt = ""
    $.ajax({
        url: "/gruppen/name",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            inhalt = data.gruppennname;
            $("body").html(inhalt);
        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })
}

function dynamischEventInGruppe(gruppenid){
    var inhalt = ""
    // id aus dem Session Storage abrufen. Er wird bei der verification mit abgespeichert
    $.ajax({
        url: "/gruppen/event",
        type: "GET",
        beforeSend: setAuthentification,
        data: {gruppenid: gruppenid},
        success: function(data){
            data.forEach(function(event){
                inhalt += "<section><p id='eventname'><b>" + event.eventname + "</b> <b>" + event.ort +"</b> <b>"+event.zeit+"</b> </p>"+
                "<p id='beschreibung'>Beschreibung: "+ event.bemerkung+ "</p><p id='fahrername'> </p>"+
                "<p><button type='submit' class='erstellen' id='dabei' value='1' onclick='eventDabei()'>Bin dabei!</button></p> </section>";  
                console.log(event);
                $("#events").html(inhalt);
            })
            
        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })
}

function eventErstellenButton(){
    $.ajax({
        url: "/events_erstellen.html",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            $('body').html(data);
        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })
}

function gruppeVerlassen(){
    $.ajax({
        url: "gruppe/verlassen",
        type: "DELETE",
        beforeSend: setAuthentification,
        success: function(data){
            console.log("Gruppe verlassen funktioniert")
        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })
}
