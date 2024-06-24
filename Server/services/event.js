const express = require('express');
const verifyToken = require('./verifyToken');
const EventDao = require('../dao/eventDao.js');
var router = express.Router();


router.get("/eventUebersicht", verifyToken, async (req, res)=>{
    const id = req.query.id;
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

router.delete("/loeschen/EventUebersicht", verifyToken, (req, res)=>{
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


module.exports = router;