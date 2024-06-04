//Funktion, um die Daten im Profil anzugucken
//window.onload = function() {
  //  document.querySelector('#profil').addEventListener('click', dynamischProfil);
    
//}


function dynamischProfil(){
    $.ajax({
        url: "/profil",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){

            $("#vnProfil").val(data.vorname);
            $("#nnProfil").val(data.nachname);
            $("#age").val(data.jahr);
            $("#bnProfil").val(data.benutzername);
            $("#lkProfil").val(data.name);

            $("#dl").val(data.fuehrerschein)
/*
            if(data.fuehrerschein == 1){
                $("#dl").val("Ja")
            }
            else{
                $("#dl").val("Nein")
            }
*/
        },
        error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
    })
}             

