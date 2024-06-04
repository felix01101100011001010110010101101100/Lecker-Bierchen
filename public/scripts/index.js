window.onload = function() {
    document.querySelector('#loginbtn').addEventListener('click', loginUser);
}
// Funktion zum Ausführen des Login-POST-Requests

function loginUser() {
    event.preventDefault();
    var bn = $('#bn').val();
    var psw = $('#psw').val();
    console.log(bn, psw);
    // AJAX-Anfrage zum Senden der Anmeldeinformationen an den Server
    $.post('/person/login', { bn: bn, psw: psw })
        .done(function(res, textStatus, jqXHR) {   
            var authHeader = jqXHR.getResponseHeader('Authorization');
            var token = authHeader.split(' ')[1]; // Der Token ist normalerweise nach dem Bearer-Schlüsselwort
            sessionStorage.setItem('token', token);
        
            $.ajax({
                url: '/home.html',
                type: 'GET',
                beforeSend: setAuthentification,
                success: function(data, textStatus, jqXHR) {
                    // Verarbeiten Sie die Antwort hier
                    $('body').html(data);
                    console.log('Success:', data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // Verarbeiten Sie den Fehler hier
                    
                    console.error('Error:', errorThrown);
                }
            });    
        })
    
        .fail(function(xhr, status, error) {
            // Fehler bei der Anmeldung, Fehlermeldung anzeigen oder andere Aktionen ausführen
            alert('Falsche Ameldeinformatinen')
            console.error('Fehler bei der Anmeldung:', error);
            
        });
        
        
}


