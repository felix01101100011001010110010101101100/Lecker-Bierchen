
function gruppeErstellen(){
    var gruppenname = $("#gruppe_erstellen").val();
    var status = 0;
    var key = Math.floor(Math.random() * 10000000000000) + 1;

    $.ajax({
      url:"/gruppe/erstellen",
      type:"POST",
      beforeSend: setAuthentification,
      data: {gruppenname: gruppenname, status : status, key: key, id : sessionStorage.getItem('id')},
      success: function(data){
        console.log("Gruppe erfolgreich angelegt");
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
      url:"home/key/raus",
      type:"GET",
      beforeSend: setAuthentification,
      data: {key: key},
      success: function(data){
        
      }
    })
}


function oeffentlicheGruppe(){
  $.ajax({
    url:"home/oeffentlich",
    type:"GET",
    beforeSend: setAuthentification,
    success: function(data){
      //Alle öffentliche Gruppen anzeigen nach öffentliche Gruppe suchen und den Gruppennamen ausgeben
      var inhalt = "<option>Öffentliche gruppe suchen</option>" + "<option> " + data.gruppenname + "</option>"
      $("#buttons").html(inhalt)
    }
  })
}

