const { set } = require("../../Server/app");

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

function einzelneGruppeGetHtml(gruppenid){
    $.ajax({
        url:"/gruppen.html",
        type:"GET",
        beforeSend: setAuthentification,
        success: function(data){
        },
    })
    .then ($.ajax({
        url:"/gruppen/daten",
        type:"GET",
        beforeSend: setAuthentification,
        data: {gruppenid},
        success: function(res){
            
        }
    }))
    
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
