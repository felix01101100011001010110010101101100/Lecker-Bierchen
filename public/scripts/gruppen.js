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
    
    // prüfen ob Admin oder nicht
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
    
    //Mitglied kicken
    .then($.ajax({
        url: "/gruppe/mitglied/entfernen",
        type: "DELETE",
        data: { id: id, gruppenid: gruppenid },
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


function fahrerSuche(eventid){
    var pruefung = 0
    var listeTeilnehmer = []
    var fahrer = ""
    
    $.ajax({
        url:"/gruppe/gruppenadmin",
        type:"GET",
        beforeSend: setAuthentification,
        data: {gruppenid: sessionStorage.getItem('gerade_in_gruppen_id')},
        success: function(data){
            if (sessionStorage.getItem('id') == data){
                pruefung = 1
                console.log("Admin überprüft")
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
            url:"/event/TeilnehmerIdListe",
            type:"GET",
            beforeSend: setAuthentification,
            data: {eventid: eventid},
            success: function(data){
                console.log(data1)

                
                if (pruefung == 1){
                    console.log("hier")
                    
                    listeTeilnehmer.push(data)
                    zufallszahl = Math.floor(Math.random()* (listeTeilnehmer.length))
                    fahrer = listeTeilnehmer[0][zufallszahl]
                    console.log(fahrer)
                }
            },
            error: function(error){
                console.error("Error: ", error)
                alert("Keine Mitglieder geholt")
            },
        })
    })
    
    .then(function(data2){
        $.ajax({
            url:"event/fahrerfestlegen",
            type:"POST",
            beforeSend: setAuthentification,
            data: {fahrer: fahrer, eventid: eventid, personenid: sessionStorage.getItem('id')},
            success: function(data){
                console.log(data2)
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

