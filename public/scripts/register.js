/*/ das funktioniert noch niht richtig hier sollte eigentllich eine schöne nachricht angezeigt werden wenn etwas
//bei der registrierung schief läuft. Die funktion wäre schön ist aber eigentlich unnötig
    function register_feedback(){
        let vn = document.querySelector('#vn').value;
        let nn = document.querySelector('#nn').value;
        let age = document.querySelector('#age').value;
        let bn = document.querySelector('#bn').value;
        let psw = document.querySelector('#psw').value;
        let pswwdh = document.querySelector('#pswwdh').value;
        let lk = document.querySelector('#lk').value;
        let führerschein = document.querySelector('input[name="führerschein"]:checked').value;
    $.ajax({
        url: '/register.html',
        type: 'POST',
        data: { vn, nn, age, bn, psw, pswwdh, lk, führerschein},

        success: function(response) {
            // Erfolgreiche Registrierung, weiterleiten zur Login-Seite 
        },
        error: function(xhr, status, error) {
            if (xhr.status === 400 && xhr.responseJSON.message === 'Benutzername bereits vorhanden') {
                var bnInput = document.getElementById('bn');
                bnInput.setCustomValidity('Benutzername bereits vorhanden');
                bnInput.reportValidity();  // Zeigt die Popup-Nachricht an
                console.log('Benutzername bereits vorhanden');
            } else {
                console.error('Fehler bei der Registrierung:', error);
            }
        }
    });
}
*/
