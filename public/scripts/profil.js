function dynamischProfil(){
    $.ajax({
        url: "/profil/benutzername",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            console.log(data);
            $("#vnProfil").val(data.vorname);
            $("#nnProfil").val(data.nachname);
            $("#age").val(data.jahr);
            $("#bnProfil").val(data.benutzername);
            $("#lkProfil").val(data.name);

           

            if(data.fuehrerschein == 1){
                $("#dl").val("Ja")
            }
            else{
                $("#dl").val("Nein")
            }

        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })
}             

