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
        
        
        $.ajax({
            
            url: '/person/eindeutig',
            method: 'GET',
            data: { bn },
            
            success: function(res) {
                if (res) {
                    alert('Benutzername bereits vorhanden');
                    return;
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
                        
                        $.ajax({
                            url: '/person/register',
                            type: 'POST',
                            data: {vn, nn, age, bn, psw, lk, führerschein},

                            success: function(res) {
                                alert("Es wurde ein Profil angelegt");
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

