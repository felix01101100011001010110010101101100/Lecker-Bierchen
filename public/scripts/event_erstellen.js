function eventErstellen(){
    var eventname = $("#eventnameEv").val();
    var ort = $("#ort").val();
    var zeit = $("#zeit").val();
    var bemerkung = $("#bemerkung").val();
    var gruppenid = sessionStorage.getItem('gerade_in_gruppen_id');
    var personid =  sessionStorage.getItem('id')
    $.ajax({
        url:"/event/in/gruppe/erstellen",
        type:"POST",
        beforeSend: setAuthentification,
        data: {eventname: eventname, ort: ort, zeit: zeit, bemerkung: bemerkung, gruppenid: gruppenid, personid: personid},
        success: function(data){
            console.log(data)
            $("#eventnameEv").val("");
            $("#ort").val("");
            $("#zeit").val("");
            $("#bemerkung").val("");
            console.log("funktioniert");
        },
        error: function(error){
            console.error("Error: ", error)
            alert("Event konnte nicht erstellt werden")
        },
    })
}

