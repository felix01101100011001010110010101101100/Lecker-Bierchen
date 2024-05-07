
// Funktion zum Ausführen des Login-POST-Requests

function loginUser() {
    
    console.log("leelomat");
    var username = $('#bn').val();
    var password = $('#psw').val();

    // AJAX-Anfrage zum Senden der Anmeldeinformationen an den Server
    $.post('/login', { bn: username, psw: password })
        .done(function(res) {   
            localStorage.setItem('token', res.token);
        })
       
        .fail(function(xhr, status, error) {
            // Fehler bei der Anmeldung, Fehlermeldung anzeigen oder andere Aktionen ausführen
            console.error('Fehler bei der Anmeldung:', error);
            
        });
        
        
}


