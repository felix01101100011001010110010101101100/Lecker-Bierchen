//das aside element sichtbar machen
function aside_anzeigen() {
        var element = document.getElementById("alle_Gruppen");
        element.style.display = "block";
}


// neue gruppe dem aside element hinzufügen


document.addEventListener("DOMContentLoaded", function() {
        var gruppe_erstellen = document.getElementById("gruppe_erstellen");
        var alle_Gruppen = document.getElementById("alle_Gruppen");
      
        gruppe_erstellen.addEventListener("keypress", function(event) {
          if (event.key === "Enter") {
            var gruppenname = gruppe_erstellen.value.trim();
            if (gruppenname !== "") {
              addgruppennametoalle_Gruppen(gruppenname);
              gruppe_erstellen.value = ""; // Leeres Textfeld nach dem Hinzufügen zurücksetzen
            }
          }
        });
      
        function addgruppennametoalle_Gruppen(gruppenname) {
          var listItem = document.createElement("li");
          listItem.textContent = gruppenname;
          alle_Gruppen.appendChild(listItem);
        }
      });
