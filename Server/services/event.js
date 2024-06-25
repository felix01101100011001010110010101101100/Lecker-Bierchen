const express = require('express');
const verifyToken = require('./verifyToken');
const EventDao = require('../dao/eventDao.js');
var router = express.Router();


router.get("/eventUebersicht/:id", verifyToken, async (req, res)=>{
    const id = req.params.id;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    datenDieZurueckGehen = await eventDao.loadById(id)
    
    res.json(datenDieZurueckGehen);
})

router.post("/event/in/gruppe/erstellen", verifyToken, (req, res)=>{
    const {eventname, ort, zeit, bemerkung, gruppenid} = req.body;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    eventDao.eventAnlegen(eventname, ort, zeit, bemerkung, gruppenid);
    res.status(200).json({message: 'Event erfolgreich angelegt'});
})

router.delete("/event/loeschen", verifyToken, (req, res)=>{
    const eventDao = new EventDao(req.app.locals.dbConnection);
    eventDao.deleteEvent();
    res.status(200).json({message: 'Event erfolgreich gelöscht'});
})

router.post("/event/dabei", verifyToken, (req, res)=>{
    const {id , eventname} = req.body;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    eventDao.dabei(id, eventname);
    res.status(200).json({message: 'beim Event erfolgreich beigetreten'});
})


//get gruppenadmin ist in gruppe.js
router.get("/event/TeilnehmerIdListe", verifyToken, async (req, res)=>{ //bitte eventid übergeben
    const eventid = req.query.eventid;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    const TeilnehmerIdListe = await eventDao.getTeilnehmer(eventid);
    res.json(TeilnehmerIdListe);
})

router.post("event/fahrerfestlegen", verifyToken, (req, res)=>{ // hier bitte eventid und personid übergeben 
    const eventid = req.body.eventid;
    const personid = req.body.personid;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    eventDao.fahrerFestlegen(eventid, personid);
    res.status(200).json({message: 'Fahrer erfolgreich festgelegt'});
});






module.exports = router;