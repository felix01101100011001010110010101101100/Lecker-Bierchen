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
const dbConnection = new sqlite3.Database(path.join(__dirname, './data/test1.db'));

//bycrypt verwenden um zu hashen
const bcrypt = require('bcrypt');
// anzahl salt runden
const saltRounds = 10;


serviceRouter = require('./services/person.js');
app.use(serviceRouter);

serviceRouter = require('./services/event.js');
app.use(serviceRouter);

serviceRouter = require('./services/gruppe.js');
app.use(serviceRouter);

serviceRouter = require('./services/landkreis.js');
app.use(serviceRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});


// folgendes muss alles noch in andere dateinen aufgespalten werden
const verifyToken = require('./services/verifyToken.js')
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


app.get('/scripts/authentification.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/scripts/authentification.js'));
});

app.get('/scripts/navigation.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/scripts/navigation.js'));
});

app.get('/event_uebersicht.html', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/events_uebersicht.html'));
});




app.locals.dbConnection = dbConnection;
module.exports = app;