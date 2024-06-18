const express = require('express');
const verifyToken = require('./verifyToken');
const GruppenDao = require('../dao/gruppenDao.js');
var router = express.Router();

router.get("/gruppe/home/anzeigen", verifyToken, async (req, res)=>{
    //username wird ja immer in der middleware gesetzt
    const id = req.query.id;
    const gruppenDao = new GruppenDao(req.app.locals.dbConnection); // Create new instance of GruppenDao
    const gruppenListe = await gruppenDao.alleGruppenDesBenutzers(id);
    res.json(gruppenListe); // Senden Liste als JSON-Antwort

})

router.post('/gruppe/erstellen', verifyToken, async (req, res) => {

    const { gruppenname, status, key , id} = req.body; // Extract data from request body
    const gruppenDao = new GruppenDao(req.app.locals.dbConnection); // Create new instance of GruppenDao
    gruppenDao.neueGruppe(gruppenname, status, key);

    gruppenid = await gruppenDao.getGruppenId(gruppenname);
    gruppenDao.gruppeBeitreten(id, gruppenid);

    res.status(200).json({ message: 'Gruppe erfolgreich angelegt' }); // Send response
});

router.get('/gruppen.html', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/gruppen.html'));
});

module.exports = router;