//const { json } = require("express");

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



function gruppeAside(){
    $.ajax({
        url:"/gruppe/aside",
        type:"GET",
        beforeSend: setAuthentification,
        success: function(data){
            
        }

    })
}

