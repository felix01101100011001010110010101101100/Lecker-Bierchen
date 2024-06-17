const express = require('express');
const verifyToken = require('./verifyToken');
const EventDao = require('../dao/eventDao.js');
var router = express.Router();


router.get("/eventUebersicht", verifyToken, (req, res)=>{
    const id = req.id;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    
    //anzahlMenschen = eventDao.anzahlMenschenImEvent(eventid);

    //datenDieZurueckGehen = eventDao.loadById(id);
    //res.send(datenDieZurueckGehen);
    //res.send(anzahlMenschen);
    res.json({eventname:"Die coolen Hosen", ort: "Albstadt", zeit: "15 Uhr", gruppenname: "Nice", bemerkung: "Alle bringen ihre eigenen Getränke mit."})

})

router.post("/event/in/gruppe/erstellen", verifyToken, (req, res)=>{
    const {eventname, ort, zeit, bemerkung} = req.body;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    eventDao.eventAnlegen(eventname, ort, zeit, bemerkung);
    res.status(200).json({message: 'Event erfolgreich angelegt'});
})


module.exports = router;