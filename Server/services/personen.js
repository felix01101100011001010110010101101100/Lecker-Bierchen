const express = require('express');
var router = express.Router();
const verifyToken = require('./verifyToken.js')

router.post('/register.html', (req, res) => {
    const {vn, nn, age, bn, psw, pswwdh, lk, führerschein} = req.body;

    //das gienge auch mit Datenbankaufruf aber wir müssen ja nur bestehen
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
});


// anmeldeversuch
router.post('/login', (req, res) => {
    const {bn, psw} = req.body;
   
    //hier könnte man doch bestimmt ne sql injection machen
   db.get("SELECT passwort FROM Person WHERE benutzername = ?", [bn], (err, datenbankreturn) => {
    
    if (err) {
        console.error('Fehler beim Abrufen des Benutzers aus der Datenbank:', err);
        return;
    }
    if (!datenbankreturn.passwort) {
        console.log('Benutzer nicht gefunden');
        return;
    }


    bcrypt.compare(psw, datenbankreturn.passwort, (err, result) => {
        if (err) {
            console.error('Fehler beim Vergleichen der Passwörter:', err);
            return;
        }
        if (result) {
            console.log('Passwörter stimmen überein');
            const token = jwt.sign({ bne: bn }, secretKey);
            //token im header übermitteln
            res.header('Authorization', 'Bearer ' + token);
            //home.html soll gerendert werden
            res.sendFile(path.join(__dirname, '../public/html/home.html'));
            
        } else {
            res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
            console.log('Passwörter stimmen nicht überein');
        }
    });
    });
});



//Funktion (oder was auch immer), um die Daten vom Server fürs Profil an Client zu senden
router.get("/api/profil", verifyToken, (req,res)=>{
    const username = req.user.bne;
    
    const query = "SELECT * FROM Person JOIN Landkreis ON Person.landkreisid = Landkreis.id WHERE benutzername=?";
    db.get(query, [username], (err, dbreturn)=>{
        if (err){
            console.error("Fehler beim Abrufen der Daten: ", err);
        }
        if(!dbreturn){
            return res.status(404).json({error: "Benutzer nicht gefunden"})
        }
        else {
            res.json(dbreturn); 
        }
    })

    

});

module.exports = router;