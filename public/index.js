
// Funktion zum Ausführen des Login-POST-Requests

function loginUser() {
    
    console.log("leelomat");
    var username = $('#bn').val();
    var password = $('#psw').val();

    // AJAX-Anfrage zum Senden der Anmeldeinformationen an den Server
    $.post('/login', { bn: username, psw: password })
        .done(function(res) {
            console.log("leelomat");   
            localStorage.setItem('token', res.token);
            // Token im Authorization-Header setzen
            console.log(localStorage.getItem("token"))

            $.ajax({
                url: './home.html',
                type: 'GET',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
                },
                success: function(response) {
                    // Erfolgreiche Antwort
                },
                error: function(xhr, status, error) {
                    // Fehlerbehandlung
                }
            });    
        })
       
        .fail(function(xhr, status, error) {
            // Fehler bei der Anmeldung, Fehlermeldung anzeigen oder andere Aktionen ausführen
            console.error('Fehler bei der Anmeldung:', error);
            
        });
        
        
}


