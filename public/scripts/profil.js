//Funktion, um die Daten im Profil anzugucken
function dynamischProfil(){
    $.ajax({
        url: "/profil",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            $("#vnProfil").val(data.vorname)
            $("#nnProfil").val(data.nachname)
            $("#age").val(data.jahr)
            $("#bnProfil").val(data.benutzername)
            $("#lkProfil").val(data.name)
        

            if(data.fuehrerschein == 1){
                $("#dl").val("Ja")
            }
            else{
                $("#dl").val("Nein")
            }
        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        }
    })
}                   