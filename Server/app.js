//6// Load express module
var express = require('express');

// Create a router instance
var router = express.Router();

// Create an express instance
var app = express();

// Importiere das 'path'-Modul von Node.js
var path = require('path'); 

// Tell the express app to use the router
app.use('/', router);

// Konfiguriere express.static für das öffentliche Verzeichnis, es sind aber nur die stylesheets wirklich public
app.use('/stylesheets', express.static(path.join(__dirname, '../public/stylesheets')));

// Middleware die urlencoded bodies parsen kann
app.use(express.urlencoded({ extended: true }));

//Daten der Datenbank hinzufügen
const sqlite3 = require('sqlite3').verbose();

// Verbindung zur SQLite-Datenbank herstellen
const db = new sqlite3.Database(path.join(__dirname, './data/test1.db'));

//bycrypt verwenden um zu hashen
const bcrypt = require('bcrypt');
// anzahl salt runden
const saltRounds = 10;

//token zeug
const jwt = require('jsonwebtoken');
const secretKey = 'geheimesSchluesselwort';

// Verbindung zur SQLite-Datenbank herstellen und Tabelle erstellen mit serialize damit die reihenfolge korrekt eingehalten wird(macht man wenn man mehrere befehle hat)
db.serialize(() => {
  
});

//db.run('INSERT INTO person (id, vorname, nachname, jahr, benutzername, passwort, fuehrerschein, landkreisid) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)',
//  ["hallo", "t", 12, "leel", 123, 1, 3])




//routes

app.post('/register.html', (req, res) => {
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
                [vn, nn, parsedAge, bn, hash, parsedFührerschein, lkIndex]);
                res.status(200).send("Profil erstellung erfolgreich");
            }
        });
    });
});


// anmeldeversuch
app.post('/login', (req, res) => {
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

// Middleware zum Überprüfen des JWT und Extrahieren des Benutzers
function verifyToken(req, res, next) {

    let token;
    // Token aus dem Authorization-Header extrahieren
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        token = authHeader.split(' ')[1];
        // Token kann jetzt richtig verwendet werden sonst ist da noch anderes zeug dran
    } else {
        // Der Token is dann undefined und das wird unten behandelt
    }
    if (typeof token !== 'undefined') {
        // Token überprüfen
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // Fehler bei der Überprüfung des Tokens
                console.log(fehler);
                res.redirect('../public/html/index.html');
            } else {
                // Token ist gültig, fügen Sie den decodierten Benutzer dem Anfrageobjekt hinzu
                req.user = decoded;
                next();
            }
        });
    } else {
        // Token nicht vorhanden
        res.status(401).json({ message: 'Token fehlt' });
    }
}


//Funktion (oder was auch immer), um die Daten vom Server fürs Profil an Client zu senden
app.get("/api/profil", verifyToken, (req,res)=>{
    
    
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



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/register.html'));
});

app.get('/home.html', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
});

app.get('/gruppen.html', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/gruppen.html'));
});

app.get('/events.html', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
});

app.get('/profil.html', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/profil.html'));
});

app.get('/scripts/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/scripts/index.js'));
});

app.get('/scripts/home.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/scripts/home.js'));
});

app.get('/scripts/register.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/scripts/register.js'));
});

app.get('/scripts/allgemein.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/scripts/allgemein.js'));
});




    





module.exports = db;
module.exports = app;