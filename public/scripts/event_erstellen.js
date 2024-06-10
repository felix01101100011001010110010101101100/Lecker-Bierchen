function eventErstellen(){
    var eventname = $("#eventname").val();
    var ort = $("#ort").val();
    var zeit = $("#zeit").val();
    var bemerkung = $("#bemerkung").val();
    
    $.ajax({
        url:"/event/in/gruppe/erstellen",
        type:"POST",
        beforeSend: setAuthentification,
        success: function(data){
            
        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })
}