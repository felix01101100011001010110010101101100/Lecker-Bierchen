const express = require('express');
const verifyToken = require('./verifyToken');
const EventDao = require('../dao/eventDao.js');
var router = express.Router();


router.get("/eventUebersicht/:id", verifyToken, async (req, res)=>{
    const id = req.params.id;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    try {
        const datenDieZurueckGehen = await eventDao.loadById(id);
        console.log(datenDieZurueckGehen);
        res.json(datenDieZurueckGehen);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: 'Fehler beim Laden der Eventübersicht', error: error.message });
    }
})

router.post("/event/in/gruppe/erstellen", verifyToken, async (req, res)=>{
    const {eventname, ort, zeit, bemerkung, gruppenid, personid} = req.body;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    try {
        const eventid = await eventDao.eventAnlegen(eventname, ort, zeit, bemerkung, gruppenid);
        eventDao.dabei(personid, eventid);
        res.status(200).json({ message: 'Event erfolgreich angelegt' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Anlegen des Events', error: error.message });
    }
    
})

router.delete("/event/loeschen", verifyToken, (req, res)=>{
    const eventDao = new EventDao(req.app.locals.dbConnection);
    try {
        const eventid = req.query.eventid;
        eventDao.deleteEvent(eventid);
        res.status(200).json({ message: 'Event erfolgreich gelöscht' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Löschen des Events', error: error.message });
    }
})

router.post("/event/dabei", verifyToken, (req, res)=>{
    const {id , eventid} = req.body;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    try {
        eventDao.dabei(id, eventid);
        res.status(200).json({ message: 'Beim Event erfolgreich beigetreten' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Beitritt zum Event', error: error.message });
    }
})


//get gruppenadmin ist in gruppe.js
router.get("/event/TeilnehmerIdListe", verifyToken, async (req, res)=>{ //bitte eventid übergeben
    const eventid = req.query.eventid;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    
    try {
        const TeilnehmerIdListe = await eventDao.getTeilnehmer(eventid);
        console.log(TeilnehmerIdListe);
        res.json(TeilnehmerIdListe);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Teilnehmerliste', error: error.message });
    }
})

router.post("/event/fahrerfestlegen", verifyToken, (req, res)=>{ // hier bitte eventid und personid übergeben 
    const eventid = req.body.eventid;
    const personid = req.body.personid;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    try {
        eventDao.fahrerFestlegen(eventid, personid);
        res.status(200).json({ message: 'Fahrer erfolgreich festgelegt' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Festlegen des Fahrers', error: error.message });
    }
});






module.exports = router;