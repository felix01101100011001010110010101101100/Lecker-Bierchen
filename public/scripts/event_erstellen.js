function eventErstellen(){
    var eventname = $("#eventname").val();
    var ort = $("#ort").val();
    var zeit = $("#zeit").val();
    var bemerkung = $("#bemerkung").val();
    
    $.ajax({
        url:"/event/in/gruppe/erstellen",
        type:"POST",
        beforeSend: setAuthentification,
        data: {eventname: eventname, ort: ort, zeit: zeit, bemerkung: bemerkung},
        success: function(data){
            console.log("funktioniert");
        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })
}
