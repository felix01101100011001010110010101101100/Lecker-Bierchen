const express = require('express');
const verifyToken = require('./verifyToken');
const EventDao = require('../dao/eventDao.js');
var router = express.Router();

router.get("/eventUebersicht", verifyToken, (req, res)=>{
    const eventDao = new EventDao(request.app.locals.dbConnection);

    //anzahlMenschen = eventDao.anzahlMenschenImEvent(eventid);

    datenDieZurueckGehen = eventDao.loadById(id);
    res.send(datenDieZurueckGehen);
    //res.send(anzahlMenschen);
    res.json({eventname:"Die coolen Hosen", ort: "Albstadt", zeit: "15 Uhr", gruppenname: "Nice", Name: "Hans", bemerkung: "Alle bringen ihre eigenen Getränke mit."})

})


module.exports = router;