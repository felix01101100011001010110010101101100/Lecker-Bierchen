window.onload = function() {
    document.querySelector('#registerbtn').addEventListener('click', register);
    
}

    function register(){

        let vn = document.querySelector('#vn').value;
        let nn = document.querySelector('#nn').value;
        let age = document.querySelector('#age').value;
        let bn = document.querySelector('#bn').value;
        let psw = document.querySelector('#psw').value;
        let pswwdh = document.querySelector('#pswwdh').value;
        let lk = document.querySelector('#lk').value;
        let führerschein = document.querySelector('input[name="führerschein"]:checked').value;
        
        // Überprüfen, ob das Alter eine gültige Zahl ist
        const parsedAge = parseInt(age);
        if (isNaN(parsedAge) && age < 18) {
            return res.status(400).send('Ungültiges Alter');
            alert('Ungültiges Alter');
        }
        
        // Überprüfen, ob das Passwort mit dem Bestätigungspasswort übereinstimmt
        if (psw !== pswwdh) {
            return res.status(400).send('Passwörter stimmen nicht überein');
            alert('Passwörter stimmen nicht überein');
        }

        const parsedFührerschein = parseInt(führerschein);
        
        var salt = dcodeIO.bcrypt.genSaltSync(10);
        var hash = dcodeIO.bcrypt.hashSync(psw, salt);
        
        $.ajax({
            
            url: '/person/eindeutig',
            method: 'GET',
            data: { bn },
            
            success: function(res) {
                console.log("Benutzernahme vorhanden: "+ res)
                if (res) {
                    alert('Benutzername bereits vorhanden');
                }
                else {
                    console.log('Benutzername noch nicht vorhanden');
                    
                }
            
                $.ajax({
                    url: '/gib_landkreis_id',
                    method: 'GET',
                    data: { lk },
          
                    success: function(res) {
                        //wenn landkreis id da ist dann wird weitergemacht
                        let lkId = res.id;
                        console.log('Landkreis ID:', lkId);
                        $.ajax({
                            url: '/person/register',
                            type: 'POST',
                            data: {vn, nn, age, bn, hash, lk, führerschein},

                            success: function(res) {
                                // Erfolgreiche Registrierung, weiterleiten zur Login-Seite 
                            },
                            error: function(xhr, status, error) {
                                    console.error('Fehler bei der Registrierung:', error);
                                }
                            });

                        },
                    error: function(xhr, status, error) {
                        console.error('Fehler bei der Anfrage:', error);
                        }
                    }); 
                }
        });
    }         

