
function gruppeErstellen(){
    var gruppenname = $("#gruppe_erstellen").val();
    var status = 0;
    var key = Math.floor(Math.random() * 10000000000000) + 1;

    $.ajax({
      url:"/gruppe/erstellen",
      type:"POST",
      beforeSend: setAuthentification,
      data: {gruppenname: gruppenname, status : status, key: key, id : sessionStorage.getItem('id'), administator: 1},
      success: function(data){
        console.log("Gruppe erfolgreich angelegt");
        $("#gruppe_erstellen").val("");
      },
      error: function(error){
        console.error("Error: ", error) 
        alert("Gruppe konnte nicht angelegt werden");
    },

    })
}


function keyGruppe(){
    var key = $("#key_buttons").val();
    
    $.ajax({
      url:"/gruppe/beitreten",
      type:"POST",
      beforeSend: setAuthentification,
      data: {key: key, personid: sessionStorage.getItem('id')},
      success: function(data){
        console.log("erfolgreich beigetreten")
        $("#key_buttons").val("");
      },
      error: function(error){
        console.error("Error: ", error) 
        alert("Der Key hat leider nicht funktioniert. Versuchen Sie es in ein paar Minuten nochmal oder versuchen Sie es mit einem anderen")
    },
    })
}
