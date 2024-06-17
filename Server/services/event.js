const express = require('express');
const verifyToken = require('./verifyToken');
const EventDao = require('../dao/eventDao.js');
var router = express.Router();

router.get("/eventUebersicht", verifyToken, (req, res)=>{
    const eventDao = new EventDao(req.app.locals.dbConnection);

    //anzahlMenschen = eventDao.anzahlMenschenImEvent(eventid);

    //datenDieZurueckGehen = eventDao.loadById(id);
    //res.send(datenDieZurueckGehen);
    //res.send(anzahlMenschen);
    res.json({eventname:"Die coolen Hosen", ort: "Albstadt", zeit: "15 Uhr", gruppenname: "Nice", bemerkung: "Alle bringen ihre eigenen Getränke mit."},{eventname:"Event", ort: "Tübingen", zeit: "18 Uhr", gruppenname: "Zuhause", bemerkung: "Habt Spaß!"})

})


module.exports = router;