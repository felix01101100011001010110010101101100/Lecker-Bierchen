//das aside element sichtbar machen
function aside_anzeigen() {
        let element = document.getElementById("alle_Gruppen");
        element.style.display = "block";
}


// neue gruppe dem aside element hinzufügen


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