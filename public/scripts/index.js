
// Funktion zum Ausführen des Login-POST-Requests

function loginUser() {
    var username = $('#bn').val();
    var password = $('#psw').val();

    // AJAX-Anfrage zum Senden der Anmeldeinformationen an den Server
    $.post('/login', { bn: username, psw: password })
        .done(function(res, textStatus, jqXHR) {   
            var authHeader = jqXHR.getResponseHeader('Authorization');
            var token = authHeader.split(' ')[1]; // Der Token ist normalerweise nach dem Bearer-Schlüsselwort
            localStorage.setItem('token', token);
            
    })
       
        .fail(function(xhr, status, error) {
            // Fehler bei der Anmeldung, Fehlermeldung anzeigen oder andere Aktionen ausführen
            console.error('Fehler bei der Anmeldung:', error);
            
        });
        
        
}


