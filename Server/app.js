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

//Daten der Datenbank hinzufügen

const sqlite3 = require('sqlite3').verbose();

// Verbindung zur SQLite-Datenbank herstellen
const db = new sqlite3.Database(path.join(__dirname, './data/test1.db'));

// Verbindung zur SQLite-Datenbank herstellen und Tabelle erstellen mit serialize damit die reihenfolge korrekt eingehalten wird(macht man wenn man mehrere befehle hat)
db.serialize(() => {
});









module.exports = app;
