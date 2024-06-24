function eventErstellen(){
    var eventname = $("#eventname").val();
    var ort = $("#ort").val();
    var zeit = $("#zeit").val();
    var bemerkung = $("#bemerkung").val();
    var gruppenid = sessionStorage.getItem('gerade_in_gruppen_id');
    console.log(eventname, ort, zeit, bemerkung, gruppenid);
    $.ajax({
        url:"/event/in/gruppe/erstellen",
        type:"POST",
        beforeSend: setAuthentification,
        data: { eventname, ort, zeit, bemerkung, gruppenid },
        success: function(eventname, ort, zeit, bemerkung, gruppenid){
            console.log("funktioniert");
        },
        error: function(error){
            console.error("Error: ", error)
            alert("Event konnte nicht erstellt werden")
        },
    })
}

