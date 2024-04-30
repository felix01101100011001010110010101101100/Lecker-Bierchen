// Load express module
var express = require('express');

// Create a router instance
var router = express.Router();

// Create an express instance
var app = express();

// Importiere das 'path'-Modul von Node.js
var path = require('path'); 

// Definiere das öffentliche Verzeichnis für statische Dateien
app.use(express.static(path.join(__dirname, '../public')));

// Tell the express app to use the router
app.use('/', router);

app.use(express.urlencoded({ extended: true }));

//Daten der Datenbank hinzufügen

const sqlite3 = require('sqlite3').verbose();

// Verbindung zur SQLite-Datenbank herstellen
const db = new sqlite3.Database(path.join(__dirname, './data/test1.db'));

// Verbindung zur SQLite-Datenbank herstellen und Tabelle erstellen mit serialize damit die reihenfolge korrekt eingehalten wird(macht man wenn man mehrere befehle hat)
db.serialize(() => {
  
});

//db.run('INSERT INTO person (id, vorname, nachname, jahr, benutzername, passwort, fuehrerschein, landkreisid) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)',
//  ["hallo", "t", 12, "leel", 123, 1, 3]);


app.post('/register.html', (req, res) => {
    const {vn, nn, age, bn, psw, pswwdh, lk, führerschein} = req.body;

    const Landkreise = [
        "Rottweil",
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
    if (isNaN(parsedAge)) {
        return res.status(400).send('Ungültiges Alter');
    }
    console.log(psw);
    console.log(pswwdh);
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
    
    // Daten in die SQLite-Datenbank einfügen
    db.run('INSERT INTO person (id, vorname, nachname, jahr, benutzername, passwort, fuehrerschein, landkreisid) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)',
    [vn, nn, parsedAge, bn, psw, lkIndex, parsedFührerschein]);
    res.status(400).send("Profil erstellung erfolgreich");
});


module.exports = db;

module.exports = app;
