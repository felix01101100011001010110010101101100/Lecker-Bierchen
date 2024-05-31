
// Funktion zum Ausführen des Login-POST-Requests

function loginUser() {
    var username = $('#bn').val();
    var password = $('#psw').val();

    bcrypt.hash(psw, saltRounds, (err, hash) => {
        if (err) {
          console.error('Fehler beim Hashen des Passworts:', err);
          return;
        }
        });

    // AJAX-Anfrage zum Senden der Anmeldeinformationen an den Server
    $.post('/login', { bn: username, hash: hash })
        .done(function(res, textStatus, jqXHR) {   
            var authHeader = jqXHR.getResponseHeader('Authorization');
            var token = authHeader.split(' ')[1]; // Der Token ist normalerweise nach dem Bearer-Schlüsselwort
            sessionStorage.setItem('token', token);
            
    })
       
        .fail(function(xhr, status, error) {
            // Fehler bei der Anmeldung, Fehlermeldung anzeigen oder andere Aktionen ausführen
            console.error('Fehler bei der Anmeldung:', error);
            
        });
        
        
}


