const express = require('express');
const verifyToken = require('./verifyToken');
const GruppenDao = require('../dao/gruppenDao.js');
var router = express.Router();

router.get("/gruppe/home/anzeigen", verifyToken, async (req, res)=>{
    //username wird ja immer in der middleware gesetzt
    try {
        const id = req.query.id;
        const gruppenDao = new GruppenDao(req.app.locals.dbConnection);
        const gruppenListe = await gruppenDao.alleGruppenDesBenutzers(id);
        res.json(gruppenListe);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Anzeigen der Gruppen', error: error.message });
    }
})

router.post('/gruppe/erstellen', verifyToken, async (req, res) => {
    try {
        const { gruppenname, status, key, id } = req.body;
        const gruppenDao = new GruppenDao(req.app.locals.dbConnection);
        const gruppenid = await gruppenDao.neueGruppe(gruppenname, status, key, id);
        gruppenDao.gruppeBeitreten(id, gruppenid);
        res.status(200).json({ message: 'Gruppe erfolgreich angelegt' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Erstellen der Gruppe', error: error.message });
    }
});

router.get('/getGruppename', verifyToken, async (req, res) => {
    try {
        const gruppenid = req.query.gruppenid;
        const gruppenDao = new GruppenDao(req.app.locals.dbConnection);
        const gruppenname = await gruppenDao.getGruppenname(gruppenid);
        res.json(gruppenname);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen des Gruppennamens', error: error.message });
    }
});


router.get('/gruppen/event', verifyToken, async (req, res) => {
    try {
        const gruppenid = req.query.gruppenid;
        const gruppenDao = new GruppenDao(req.app.locals.dbConnection);
        const eventListe = await gruppenDao.getEvents(gruppenid);
        res.json(eventListe);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Eventliste', error: error.message });
    }
});

router.delete('/gruppe/verlassen', verifyToken, async (req, res) => {
    try {
        const { id, gruppenid } = req.body;
        const gruppenDao = new GruppenDao(req.app.locals.dbConnection);
        gruppenDao.gruppeVerlassen(id, gruppenid);
        res.status(200).json({ message: 'Gruppe erfolgreich verlassen' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Verlassen der Gruppe', error: error.message });
    }
});

router.post('/gruppe/beitreten', verifyToken, async (req, res) => {
    try {
        const gruppenDao = new GruppenDao(req.app.locals.dbConnection);
        const gruppenid = await gruppenDao.getGruppenIdViaKey(req.body.key);
        gruppenDao.gruppeBeitreten(req.body.personid, gruppenid);
        res.status(200).json({ message: 'Gruppe erfolgreich beigetreten' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Beitritt zur Gruppe', error: error.message });
    }
});

router.get('/gruppe/gruppenadmin', verifyToken, async (req, res) => { //hier bitte die gruppenid übergeben, die ist im local storage gespeichert
    const gruppenid = req.query.gruppenid;
    const gruppenDao = new GruppenDao(req.app.locals.dbConnection);
    const gruppenadmin = await gruppenDao.getGruppenadmin(gruppenid);
    res.json(gruppenadmin);
});

router.delete('gruppe/loeschen', verifyToken, async (req, res) => {
    const gruppenid = req.body.gruppenid;
    const gruppenDao = new GruppenDao(req.app.locals.dbConnection);
    gruppenDao.deleteGruppe(gruppenid);
    res.status(200).json({ message: 'Gruppe erfolgreich gelöscht' });
});


router.get("gruppe/getKey", verifyToken, async (req, res) => {
    const gruppenid = req.query.gruppenid;
    const gruppenDao = new GruppenDao(req.app.locals.dbConnection);
    const key = await gruppenDao.getKey(gruppenid);
    res.json(key);
});

router.delete("gruppe/mitglied/entfernen", verifyToken, async (req, res) => {
    const personid = req.body.personid;
    const gruppenid = req.body.gruppenid;
    const gruppenDao = new GruppenDao(req.app.locals.dbConnection);
    gruppenDao.mitgliedEntfernen(personid, gruppenid);
    res.status(200).json({message: 'Mitglied erfolgreich entfernt'});
});

router.get("gruppe/Mitglieder", verifyToken, async (req, res) => {
    const gruppenid = req.query.gruppenid;
    const gruppenDao = new GruppenDao(req.app.locals.dbConnection);
    const Mitglieder = await gruppenDao.getGruppenmitglieder(gruppenid);
    // von jedem mitglied werden id benutzername und alter zurückgegeben
    res.json(Mitglieder);
});


module.exports = router;