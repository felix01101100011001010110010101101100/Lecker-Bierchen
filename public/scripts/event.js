function eventDabei(eventid){
    var personid = sessionStorage.getItem("id");
    console.log(personid)
    //damit das in event übersicht angezeigt wird
    $.ajax({
        url:"/event/dabei",
        type:"POST",
        beforeSend: setAuthentification,
        data: {personid:personid, eventid:eventid},
        success:function(){
            console.log("funktioniert");
        },
        error: function(error) {
            console.error("Error: ", error);
            alert('Du konntest dich nicht zum Event anmelden');
        }

    })
    //in Eventübersicht switchen
    .then($.ajax({
        url: "/event_uebersicht.html",
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

function eventLoeschen(eventid){
    var pruefung = 0;
    console.log("test1", eventid);
    gruppenid = sessionStorage.getItem('gerade_in_gruppen_id');
    // Admin überprüfen
    $.ajax({
        url: "/gruppe/gruppenadmin",
        type: "GET",
        beforeSend: setAuthentification,
        data: {gruppenid: gruppenid},
        success: function(data){
            if (sessionStorage.getItem('id') == data){
                pruefung = 1;
            } else {
                console.log(data)
                alert("Kein Zugriff. Diese Funktion hat nur der Administrator!!!!");
            }
        },
        error: function(error){
            console.error("Error: ", error);
            alert("Kein event löschen möglich");
        },
    })
    .then(function() {
        if (pruefung === 1) {
            // Event löschen
            return $.ajax({
                url: "/event/loeschen"+eventid,
                type: "DELETE",
                beforeSend: setAuthentification,
                success: function(data){
                    console.log("Event wurde erfolgreich gelöscht");
                },
                error: function(error){
                    console.error("Error ", error);
                    alert("Seite konnte nicht neu geladen werden");
                },
            });
        }
    })
    .then(function() {
        // Seite neu laden nach dem Löschen, nur wenn pruefung === 1
        if (pruefung === 1) {
            return $.ajax({
                url: "/gruppen.html",
                type: "GET",
                beforeSend: setAuthentification,
                success: function(data){
                    $("body").html(data);
                },
                error: function(error){
                    console.error("Error ", error);
                    alert("Seite konnte nicht geladen werden");
                },
            });
        }
    });
}
=======
}*/
async function eventLoeschen(eventid) {
    try {
        // Admin überprüfen
        const adminData = await $.ajax({
            url: "/gruppe/gruppenadmin",
            type: "GET",
            beforeSend: setAuthentification,
            data: {gruppenid: sessionStorage.getItem('gerade_in_gruppen_id')}
        });

        if (sessionStorage.getItem('id') == adminData) {
            // Event löschen
            const deleteData = await $.ajax({
                url: "/event/loeschen",
                type: "DELETE",
                data: {eventid: eventid},
                beforeSend: setAuthentification
            });
            console.log("Event wurde erfolgreich gelöscht");

            // Seite neu laden
            const pageData = await $.ajax({
                url: "/gruppen.html",
                type: "GET",
                beforeSend: setAuthentification
            });
            $("body").html(pageData);
        } else {
            alert("Kein Zugriff. Diese Funktion hat nur der Administrator!!!!");
        }
    } catch (error) {
        console.error("Fehler: ", error.responseText);
        alert("Ein Fehler ist aufgetreten: " + error.responseText);
    }
}
>>>>>>> 9a9cca22bfa426d75c71adca1991163aed86a6ea
