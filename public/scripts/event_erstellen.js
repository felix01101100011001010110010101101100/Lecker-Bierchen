function eventErstellen(){
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