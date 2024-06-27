function eventErstellen(){
    var eventname = $("#eventname").val();
    var ort = $("#ort").val();
    var zeit = $("#zeit").val();
    var bemerkung = $("#bemerkung").val();
    var gruppenid = sessionStorage.getItem('gerade_in_gruppen_id');
    var personid =  sessionStorage.getItem('id')
    $.ajax({
        url:"/event/in/gruppe/erstellen",
        type:"POST",
        beforeSend: setAuthentification,
        data: {eventname, ort, zeit, bemerkung, gruppenid, personid},
        success: function(success){
            console.log("funktioniert");
            $("#eventnameEv").val("");
            $("#ort").val("");
            $("#zeit").val("");
            $("#bemerkung").val("");
        },
        error: function(error){
            console.error("Error: ", error)
            alert("Event konnte nicht erstellt werden")
        },
    })
}

