            /*
            $.ajax({
                url: './home.html',
                type: 'GET',
                cache: false, // Caching muss ich auschalten weil es die home.html sonst nicht direkt render aus irgend nem grund
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
                },
                success: function(response) {
                    document.body.innerHTML = response;
                    // Erfolgreiche Antwort
                },
                error: function(xhr, status, error) {
                    // Fehlerbehandlung
                    console.error('Fehler bei der Anmeldung:', error);
                }
            });  */  