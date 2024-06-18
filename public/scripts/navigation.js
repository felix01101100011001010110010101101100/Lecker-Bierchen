//const { json } = require("express");

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
        success: function(data) {            $('body').html(data);
        },
        error: function(errorThrown) {
            console.log('Error:', errorThrown);
        }
    });       	
    

}

function einzelneGruppeGetHtml(){
    $.ajax({
        url:"/gruppen.html",
        type:"GET",
        beforeSend: setAuthentification,
        success: function(data){
            console.log("geladen");
        }
    })
}



function gruppeAside(){
    $.ajax({
        url:"/gruppe/aside",
        type:"GET",
        beforeSend: setAuthentification,
        success: function(data){

        }

    })
}
