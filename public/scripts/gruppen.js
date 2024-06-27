/*function gruppenName(){  
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
            console.error("Error: ", error) 
            alert("Der Gruppenname kann leider nicht angezeigt werden")
        },
    })
}*/

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
                "<p><button type='submit' class='erstellen' id='dabei' value='1' onclick='eventDabei("+event.eventName+")'>Bin dabei!</button>"+
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

function mitgliederAnzeigen(){
    var inhalt = "<p id='mitglieder'>Mitglieder<i id='schluessel' onclick='keyAnzeigen()' class='fa-solid fa-key'></i><i class='fa-solid fa-trash' onclick='gruppeLoeschen()' id='trash'></i> <i class='fa-solid fa-person-walking-arrow-right' onclick='gruppeVerlassen()' id='leave'></i></p>"
    var gruppenid = sessionStorage.getItem("gerade_in_gruppen_id");
    console.log("hier"+gruppenid); 
    $.ajax({
        url: "/gruppe/mitglieder",
        type:"GET",
        beforeSend: setAuthentification,
        data:{gruppenid: gruppenid},
        success: function(data){
            console.log(data),
            data.forEach(function(event){
                inhalt += '<div id="benutzernameboxen">' +
                '<p id="benutzername"> Benutzername:'+ event.benutzername +'<i id="bnEntfernen" onclick="mitgliederKicken()" class="fa-solid fa-xmark"></i> <br> Alter:'+ event.jahr +
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

function mitgliederKicken() {
    var pruefung = 0;
    var id = sessionStorage.getItem("id");
    var gruppenid = sessionStorage.getItem("gerade_in_gruppen_id");
    
    $.ajax({
        url:"/gruppe/gruppenadmin",
        type:"GET",
        beforeSend: setAuthentification,
        data: {gruppenid: sessionStorage.getItem('gerade_in_gruppen_id')},
        success: function(data){
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
    
    .then($.ajax({
        url: "/gruppe/mitglied/entfernen",
        type: "DELETE",
        data: { id: id, gruppenid: gruppenid },
        beforeSend: setAuthentification,
        success: function(data) {
            var admin = data.administator
            console.log("Mitglied entfernen funktioniert");

        },
        error: function(error) {
            console.error("Error: ", error);
            alert("Sie konnten das Mitglied nicht kicken");
        }
    }));
    
}


function fahrerSuche(eventid){
    var pruefung = 0
    var listeTeilnehmer = []
    var fahrer = ""
    console.log(eventid)
    
    $.ajax({
        url:"/gruppe/gruppenadmin",
        type:"GET",
        beforeSend: setAuthentification,
        data: {gruppenid: sessionStorage.getItem('gerade_in_gruppen_id')},
        success: function(data){
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
        console.log(eventid)
        $.ajax({
            url:"/event/TeilnehmerIdListe",
            type:"GET",
            beforeSend: setAuthentification,
            data: {eventid: eventid},
            success: function(data){
                console.log(data)
                if (pruefung == 1){
                    console.log("hier")
                    
                    listeTeilnehmer.push(data)
                    zufallszahl = Math.floor(Math.random()* (listeTeilnehmer.length - 0+1))
                    fahrer = listeTeilnehmer[zufallszahl]
                    //console.log(fahrer)
                }
            },
            error: function(error){
                console.error("Error: ", error)
                alert("Keine Mitglieder geholt")
            },
        })
    })
    .then(function(){
        $.ajax({
            url:"event/fahrerfestlegen",
            type:"POST",
            beforeSend: setAuthentification,
            data: {fahrer: fahrer, eventid: eventid, personenid: sessionStorage.getItem('id')},
            success: function(data){
                console.log("fahrer hinzu")
            }
        })
    })  
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

