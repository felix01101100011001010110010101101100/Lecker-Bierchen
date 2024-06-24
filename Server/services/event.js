const express = require('express');
const verifyToken = require('./verifyToken');
const EventDao = require('../dao/eventDao.js');
var router = express.Router();


router.get("/eventUebersicht", verifyToken, async (req, res)=>{
    const id = req.query.id;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    datenDieZurueckGehen = await eventDao.loadById(id);
    res.json(datenDieZurueckGehen);

})

router.post("/event/in/gruppe/erstellen", verifyToken, (req, res)=>{
    const {eventname, ort, zeit, bemerkung, gruppenid} = req.body;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    eventDao.eventAnlegen(eventname, ort, zeit, bemerkung, gruppenid);

    res.status(200).json({message: 'Event erfolgreich angelegt'});
})


router.get("/gruppen/event", verifyToken, (req,res)=>{
    res.send({eventname: Holly, ort: Rottweil, zeit: 16, bemerkung: Gut})
})

module.exports = router;