function gruppenName(){  
    //console.log("Gruppenid von gruppenname: " + sessionStorage.getItem('gerade_in_gruppen_id'))
    $.ajax({
        url:"/get/gruppe",
        type: "GET",
        beforeSend: setAuthentification,
        data: {gruppenid: sessionStorage.getItem('gerade_in_gruppen_id')},
        success: function(data){
            console.log(data)
            $("#gruppenname").html(data.gruppenname);
        },
        error: function(error){
            console.error("Error: ", error) 
            alert("Der Gruppenname kann leider nicht angezeigt werden")
        },
    })
}

function dynamischEventInGruppe(){
    var inhalt = ""
    // id aus dem Session Storage abrufen. Er wird bei der verification mit abgespeichert
    var  gruppenid = sessionStorage.getItem("gerade_in_gruppen_id"); 
    $.ajax({
        url: "/gruppen/event",
        type: "GET",
        beforeSend: setAuthentification,
        data: {gruppenid: gruppenid},
        success: function(data){
            data.forEach(function(event){
                inhalt += "<section><p id='eventname'><b>" + event.eventname + "</b> <b>" + event.ort +"</b> <b>"+event.zeit+"</b> </p>"+
                "<p id='beschreibung'>Beschreibung: "+ event.bemerkung+ "</p><p id='fahrername'> </p>"+
                "<p><button type='submit' class='erstellen' id='dabei' value='1' onclick='eventDabei("+event.eventid+")'>Bin dabei!</button>"+
                "<button type='submit' class='erstellen' id='remove' onclick='eventLoeschen("+event.eventid+")'> Löschen</button>"+
                "<button type='submit' class='erstellen' id='fahrer' onclick='fahrerSuche("+event.eventid+")'>Fahrer suchen!</button></p> </section>";  
                console.log(event);
                $("#events").html(inhalt);
            })
            
        },
        error: function(error){
            console.error("Error: ", error)
            alert("Das Event kann nicht angezeigt werden")
        },
    })
}

function eventErstellenButton(){
    //Event erstellen
    $.ajax({
        url: "/events_erstellen.html",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            $('body').html(data);
        },
        error: function(error){
            console.error("Error: ", error) 
            alert("Das Event konnte nicht erstellt werden")
        },
    })
}

function gruppeVerlassen(){
    id = sessionStorage.getItem("id");
    gruppenid = sessionStorage.getItem("gerade_in_gruppen_id");
    $.ajax({
        url: "/gruppe/verlassen",
        type: "DELETE",
        data: {id, gruppenid},
        beforeSend: setAuthentification,
        success: function(data){
            console.log("Gruppe verlassen funktioniert")
        },
        error: function(error){
            console.error("Error: ", error) 
            alert("Sie konnten die Gruppe nicht verlassen")
        },
        
    })
    //wenn man Gruppen verläasst auf home landen
    .then($.ajax({
        url: "/home.html",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            $("body").html(data)
        },
        error: function(error){
            console.error("Error ", error);
            alert("Seite konnte nicht geladen werden");
        },
    }))
}

//Mitglieder anzeigen lassen
function mitgliederAnzeigen(){
    var inhalt = "<p id='mitglieder'>Mitglieder<i id='schluessel' onclick='keyAnzeigen()' class='fa-solid fa-key'></i><i class='fa-solid fa-trash' onclick='gruppeLoeschen()' id='trash'></i> <i class='fa-solid fa-person-walking-arrow-right' onclick='gruppeVerlassen()' id='leave'></i></p>"
    var gruppenid = sessionStorage.getItem("gerade_in_gruppen_id");

    $.ajax({
        url: "/gruppe/mitglieder",
        type:"GET",
        beforeSend: setAuthentification,
        data:{gruppenid: gruppenid},
        success: function(data){
            console.log(data),
            data.forEach(function(mitglied){
                inhalt += '<div id="benutzernameboxen">' +
                '<p id="benutzername"> Benutzername:'+ mitglied.benutzername +'<i id="bnEntfernen" onclick="mitgliederKicken('+mitglied.id+')" class="fa-solid fa-xmark"></i> <br> Alter:'+ mitglied.jahr +
                '</p></div>';
                
                console.log("Mitglieder anzeigen funktioniert");
            })
            
            $("#asideGroup").html(inhalt);
        },
        error: function(error){
            console.error("Error: ", error)
            alert("Die Mitglieder konnten nicht angezeigt werden")
        },
    })
}

function mitgliederKicken(id) {
    var pruefung = 0;
    /*console.log("vorher")
    console.log(id)
    console.log(gruppenid)
    var id = sessionStorage.getItem("id");*/
    var gruppenid = sessionStorage.getItem("gerade_in_gruppen_id");
    

    console.log("nacher")
    console.log(id)
    console.log(gruppenid)

    // prüfen ob Admin oder nicht
    $.ajax({
        url:"/gruppe/gruppenadmin",
        type:"GET",
        beforeSend: setAuthentification,
        data: {gruppenid: gruppenid},
        success: function(data){
            if (sessionStorage.getItem('id') == data){
                pruefung = 1;
            }
            else{
                alert("Kein Zugriff. Diese Funktion hat nur der Administrator!!!!")
            }
        },
        error: function(error){
            console.error("Error: ", error)
            alert("Keine Fahrersuche möglich")
        },
        
    })
    
    //Mitglied kicken
    .then($.ajax({
        url: "/gruppe/mitglied/entfernen",
        type: "DELETE",
        data: { personid: id , gruppenid: gruppenid },
        beforeSend: setAuthentification,
        success: function(data) {
            console.log("Mitglied entfernen funktioniert");

        },
        error: function(error) {
            console.error("Error: ", error);
            alert("Sie konnten das Mitglied nicht kicken");
        }
    }))
    //Seite neu laden
    .then($.ajax({
        url: "/gruppen.html",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            $("body").html(data)
            dynamischEventInGruppe(gruppenid)
        },
        error: function(error){
            console.error("Error ", error);
            alert("Seite konnte nicht geladen werden");
        },
    }));
    
}


async function fahrerSuche(eventid){    
    try{
    let admin = await $.ajax({
        url: "/gruppe/gruppenadmin",
        type: "GET",
        beforeSend: setAuthentification,
        data: { gruppenid: sessionStorage.getItem('gerade_in_gruppen_id') }
    });

    if (sessionStorage.getItem('id') != admin) {
        alert("Kein Zugriff. Diese Funktion hat nur der Administrator!!!!");
        return;
    }
    console.log("Admin überprüft");

    
    let teilnehmer = await $.ajax({
        url: "/event/TeilnehmerIdListe",
        type: "GET",
        beforeSend: setAuthentification,
        data: { eventid: eventid }
    });

    console.log(eventid);
    console.log(teilnehmer);

    if (teilnehmer.length === 0) {
        alert("Keine Mitglieder gefunden.");
        return;
    }

    let zufallszahl = Math.floor(Math.random() * teilnehmer.length);
    let fahrer = teilnehmer[zufallszahl].benutzername;  // Stelle sicher, dass benutzername verwendet wird
    console.log(fahrer);

    // Setze den Fahrer
    await $.ajax({
        url: "/event/fahrerfestlegen",
        type: "POST",
        beforeSend: setAuthentification,
        data: { fahrer: fahrer, eventid: eventid }
    });

    console.log("Fahrer hinzugefügt");
    }
    catch (error) {
        console.error("Error: ", error);
        alert("Ein Fehler ist aufgetreten. Operation abgebrochen.");
    }
    } 

function keyAnzeigen(){
    $.ajax({
        url:"/gruppe/getKey",
        type:"GET",
        beforeSend: setAuthentification,
        data: {gruppenid: sessionStorage.getItem('gerade_in_gruppen_id')},
        success: function(data){
            alert("Key:" + data)
        },
        error: function(error) {
            console.error("Error: ", error);
            alert("Der Schlüssel konnte nicht angezeigt werden!");
        }
    })
}

function gruppeLoeschen(){
    var pruefung = 0
    $.ajax({
        url:"/gruppe/gruppenadmin",
        type:"GET",
        beforeSend: setAuthentification,
        data: {gruppenid: sessionStorage.getItem('gerade_in_gruppen_id')},
        success: function(data){
            console.log(data)
            if (sessionStorage.getItem('id') == data){
                pruefung = 1 
            }
            else{
                alert("Kein Zugriff. Diese Funktion hat nur der Administrator!!!!")
            }
        },
        error: function(error){
            console.error("Error: ", error)
            alert("Keine Fahrersuche möglich")
        },
        
    })
    .then(function(data1){
    $.ajax({
        url:"/gruppe/loeschen",
        type:"DELETE",
        beforeSend: setAuthentification,
        data: {gruppenid: sessionStorage.getItem('gerade_in_gruppen_id')},
        success: function(data){
            alert("Die Gruppe wurde erfolgreich gelöscht!")
        },
        error: function(error) {
            console.error("Error: ", error);
            alert("Gruppe konnte nicht gelöscht werden!");
        }
    })
}) 
.then($.ajax({
    url: "/home.html",
    type: "GET",
    beforeSend: setAuthentification,
    success: function(data){
        $("body").html(data)
    },
    error: function(error){
        console.error("Error ", error);
        alert("Seite konnte nicht geladen werden");
    },
}))
}

