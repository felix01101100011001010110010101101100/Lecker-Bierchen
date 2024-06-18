//das aside element sichtbar machen
function aside_anzeigen() {
        let element = document.getElementById("alle_Gruppen");
        element.style.display = "block";

        $.ajax({
          url:"/gruppe/home/anzeigen",
          type:"GET",
          beforeSend: setAuthentification,
          success: function(data){
            console.log(data);
            var inhalt = "<p>Deine Gruppen</p> <hr>";
            data.forEach(function(gruppe){

              inhalt += "<a href='../html/gruppen.html'>" + gruppe.gruppenname + "</a><br>";

            })
          $("#asideGruppen").html(inhalt)
          },
          
          error: function(error){
            console.error("Error: ", error) //vlt. alert
        },
        })

}

function gruppeErstellen(){
    var gruppenname = $("#gruppe_erstellen").val();
    var status = 0;
    //var key = zufallszahlengenerator
    $.ajax({
      url:"/gruppe/erstellen",
      type:"POST",
      beforeSend: setAuthentification,
      data: {gruppenname: gruppenname, status : status, key: key},
      success: function(data){
        console.log("Hier");
      },
      error: function(error){
        console.error("Error: ", error) //vlt. alert
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




// neue gruppe dem aside element hinzufügen




//der folgende code ist outdated 
/*
document.addEventListener("DOMContentLoaded", function() {
        let gruppe_erstellen = document.getElementById("gruppe_erstellen");
        let alle_Gruppen = document.getElementById("alle_Gruppen");
      
        gruppe_erstellen.addEventListener("keypress", function(event) {
          if (event.key === "Enter") {
            let gruppenname = gruppe_erstellen.value.trim();
            if (gruppenname !== "") {
              addgruppennametoalle_Gruppen(gruppenname);
              gruppe_erstellen.value = ""; // Leeres Textfeld nach dem Hinzufügen zurücksetzen
            }
          }
        });

        function addgruppennametoalle_Gruppen(gruppenname) {
          let listItem = document.createElement("li");
          let link = document.createElement("a");
          link.textContent = gruppenname;
          link.href = "gruppen.html";
          listItem.appendChild(link);
          alle_Gruppen.appendChild(listItem);     
        }
      });
      */
