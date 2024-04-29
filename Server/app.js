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

module.exports = app;
