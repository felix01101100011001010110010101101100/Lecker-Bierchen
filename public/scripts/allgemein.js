//const { json } = require("express");

//setzen des authentification headers
function setAuthentification(xhr) {
    const token = localStorage.getItem('token')
        
        if (!token) {
            showError('Not authenticated. Please log in.');
            throw new Error('Not authenticated. Please log in.');//
        }
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
}

function get_home_html(){
    $.ajax({
        url: '/home.html',
        type: 'GET',
        beforeSend: setAuthentification,
        success: function(data) {
            console.log('Klappt:');
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
            console.log('Klappt');
            $('body').html(data);
        },
        error: function(errorThrown) {
            console.log('Error:', errorThrown);
        }
    });       	
    

}

//Funktion, um die Daten im Profil anzugucken
function dynamischProfil(){
    $.ajax({
        url: "/api/profil",
        type: "GET",
        beforeSend: setAuthentification,
        success: function(data){
            $("#vnProfil").val(data.vorname)
            $("#nnProfil").val(data.nachname)
            $("#age").val(data.jahr)
            $("#bnProfil").val(data.benutzername)


            if(data.fuehrerschein){
                $("input[name=führerschein][value=" + data.fuehrerschein + "]").prop("checked",true);
            }
            else{
                $("input[name=führerschein][value='nein']").prop("checked", true);
            }
        },
        error: function(error){
            console.error("Error: ", error)
        }
    })
}                   