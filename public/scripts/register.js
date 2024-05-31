    function register(){
        let vn = document.querySelector('#vn').value;
        let nn = document.querySelector('#nn').value;
        let age = document.querySelector('#age').value;
        let bn = document.querySelector('#bn').value;
        let psw = document.querySelector('#psw').value;
        let pswwdh = document.querySelector('#pswwdh').value;
        let lk = document.querySelector('#lk').value;
        let führerschein = document.querySelector('input[name="führerschein"]:checked').value;

        const Landkreise = [
            "Landkreis Rottweil",
            "Zollernalbkreis",
            "Tuttlingen",
            "Schwarzwald-Baar-Kreis",
            "Landkreis Konstanz",
            "Stuttgart",
            "Böblingen",
            "Alb-Donau-Kreis",
            "Landkreis Biberach",
            "Bodenseekreis",
            "Landkreis Breisgau-Hochschwarzwald",
            "Landkreis Calw",
            "Landkreis Emmendingen",
            "Enzkreis",
            "Landkreis Esslingen",
            "Landkreis Freudenstadt",
            "Landkreis Göppingen",
            "Landkreis Heidenheim",
            "Landkreis Heilbronn",
            "Hohenlohekreis",
            "Landkreis Karlsruhe",
            "Landkreis Lörrach",
            "Landkreis Ludwigsburg",
            "Main-Tauber-Kreis",
            "Neckar-Odenwald-Kreis",
            "Ortenaukreis",
            "Ostalbkreis",
            "Landkreis Rastatt",
            "Landkreis Ravensburg",
            "Rems-Murr-Kreis",
            "Landkreis Reutlingen",
            "Rhein-Neckar-Kreis",
            "Landkreis Schwäbisch Hall",
            "Landkreis Sigmaringen",
            "Landkreis Tübingen",
            "Landkreis Waldshut"
        ];
        // Überprüfen, ob das Alter eine gültige Zahl ist
        const parsedAge = parseInt(age);
        if (isNaN(parsedAge) && age < 18) {
            return res.status(400).send('Ungültiges Alter');
        }
        
        // Überprüfen, ob das Passwort mit dem Bestätigungspasswort übereinstimmt
        if (psw !== pswwdh) {
            return res.status(400).send('Passwörter stimmen nicht überein');
        }
    
        const parsedFührerschein = parseInt(führerschein);
        
        // Überprüfen, ob der Landkreiswert gültig ist
        const lkIndex = Landkreise.indexOf(lk) + 1;
        if (lkIndex < 1) {
            return res.status(400).send("Ungültiger Landkreis");
        }
        
        // Passwort hashen
        bcrypt.hash(psw, saltRounds, (err, hash) => {
            if (err) {
              console.error('Fehler beim Hashen des Passworts:', err);
              return;
            } 
        
            // Überprüfen, ob der Benutzername bereits existiert
            db.get('SELECT * FROM person WHERE benutzername = ?', [bn], (err, row) => {
                if (err) {
                    console.error('Fehler in der datenbankabfrage', err);
                    return;
                }
    
                if (row) {
                    res.status(400).send("Benutzername bereits vorhanden");
                } else {
                    // Daten in die SQLite-Datenbank einfügen
                    db.run('INSERT INTO person (id, vorname, nachname, jahr, benutzername, passwort, fuehrerschein, landkreisid) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)',
                    [vn, nn, parsedAge, bn, hash, parsedFührerschein, lkIndex,]);
                    res.sendFile(path.join(__dirname, '../public/html/index.html'));
                }
            });
        });

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
