//const { set } = require("../../Server/app");

function get_home_html(){
    $.ajax({
        url: '/home.html',
        type: 'GET',
        beforeSend: setAuthentification,
        success: function(data) {
            $('body').html(data);
        },
        error: function( errorThrown) {
            console.log('Error:', errorThrown);
        }
    });       

}

function get_event_uebersicht_html(){
    $.ajax({
        url: '/event_uebersicht.html',
        type: 'GET',
        beforeSend: setAuthentification,
        success: function(data) {
            $('body').html(data);
        },
        error: function( errorThrown) {
            console.log('Error:', errorThrown);
        }
    });       

}

function get_profil_html(){
    $.ajax({    
        url: '/profil.html',
        type: 'GET',
        beforeSend: setAuthentification,
        success: function(data) {            
            $('body').html(data);
        },
        error: function(errorThrown) {
            console.log('Error:', errorThrown);
        }
    });       	
    

}

//das aside element sichtbar machen
function aside_anzeigen() {
    let element = document.getElementById("alle_Gruppen");
    element.style.display = "block";

    id = sessionStorage.getItem('id');

    $.ajax({
      url:"/gruppe/home/anzeigen",
      type:"GET",
      beforeSend: setAuthentification,
      data: {id :id},
      
      success: function(data){
       
        var inhalt = "<p>Deine Gruppen</p> <hr>";
        data.forEach(function(gruppe){


          inhalt += "<p onclick='einzelneGruppeGetHtml(" + gruppe.id + "," + gruppe.gruppename+ ")'>" + gruppe.gruppenname + "</p><br>";

        })
      $("#asideGruppen").html(inhalt)
      },
      
      error: function(error){
        console.error("Error: ", error) 
    },
    })

}
function einzelneGruppeGetHtml(gruppenid, gruppename){
    var inhalt= ""
    $.ajax({
        url:"/gruppen.html",
        type:"GET",
        beforeSend: setAuthentification,
        success: function(data){
            $('body').html(data);
            //um für andere gruppenfunktionen die gruppenid zu haben
            sessionStorage.setItem('gerade_in_gruppen_id', gruppenid);
            dynamischEventInGruppe(gruppenid);
        
            inhalt = "<p id='gruppenname'>"+ gruppename +"</p>"
            console.log(gruppename)
            $("#gruppenname").html(inhalt);
        }
    
    })
}

