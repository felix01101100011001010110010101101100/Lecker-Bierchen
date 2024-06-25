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
                "<p><button type='submit' class='erstellen' id='dabei' value='1' onclick='eventDabei()'>Bin dabei!</button>"+
                "<button type='submit' class='erstellen' id='remove' onclick='eventLoeschen()'> Löschen</button>"+
                "<button type='submit' class='erstellen' id='fahrer' onclick='fahrerSuche()'>Fahrer suchen!</button></p> </section>";  
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
        url: "gruppe/verlassen",
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
}

function mitgliederAnzeigen(){
    inhalt = "";
    $.ajax({
        url: "gruppen/mitglieder/:id",
        type:"GET",
        beforeSend: setAuthentification,
        success: function(data){
            data.forEach(function(event){
                inhalt += '<div id="benutzernameboxen">' +
                '<p id="benutzername">'+ event.benutzername +''+ event.jahr +'<i id="bnEntfernen" class="fa-solid fa-xmark"></i></p>' +
                '</div>';
                console.log("Mitglieder anzeigen funktioniert");
            })
            
            
        },
        error: function(error){
            console.error("Error: ", error)
            alert("Die Mitglieder konnten nicht angezeigt werden")
        },
    })
}

function eventLoeschen(){
    
    

}

function fahrerSuche(){
    var pruefung = 0
    var listeTeilnehmer = []
    var fahrer = ""
    $.ajax({
        url:"/gruppe/gruppenadmin",
        type:"GET",
        beforeSend: setAuthentification,
        success: function(data){
            var admin = data.administrator
            if (sessionStorage.getItem('id') === admin){
                pruefung = 1 
            }
            else{
                alert("Kein Zugriff. Diese Funktion hat nur der Administrator!!!!")
            }
        },
        error: function(error){
            console.error("Error: ", error)
            alert("Event konnte nicht gelöscht werden")
        },
        
    })
    
    .then(function(data1){
        $.ajax({
            url:"/event/TeilnehmerIdListe",
            type:"GET",
            beforeSend: setAuthentification,
            success: function(data){
                if (pruefung == 1){
                    listeTeilnehmer.push(data)
                    zufallszahl = Math.floor(Math.random()* (listeTeilnehmer.length - 0+1))
                    fahrer = listeTeilnehmer[zufallszahl]
                }
            }
        })
    })
    .then(function(data2){
        $.ajax({
            url:"event/fahrerfestlegen",
            type:"POST",
            beforeSend: setAuthentification,
            data: {fahrer: fahrer},
            success: function(data){
                console.log("fahrer hinzu")
            }
        })
    })  
}

