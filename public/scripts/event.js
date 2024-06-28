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
                url: "/event/loeschen"+eventid,
                type: "DELETE",
            
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
