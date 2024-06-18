const express = require('express');
const verifyToken = require('./verifyToken');
const EventDao = require('../dao/eventDao.js');
var router = express.Router();


router.get("/eventUebersicht", verifyToken, async (req, res)=>{
    const id = req.query.id;
    const eventDao = new EventDao(req.app.locals.dbConnection);

    //anzahlMenschen = eventDao.anzahlMenschenImEvent(eventid);

    //datenDieZurueckGehen = eventDao.loadById(id);
    //res.send(datenDieZurueckGehen);
    //res.send(anzahlMenschen);
    let daten1 = {
        eventname: "Die coolen Hosen",
        ort: "Albstadt",
        zeit: "15 Uhr",
        gruppenname: "Nice",
        bemerkung: "Alle bringen ihre eigenen Getränke mit."
    };

    let daten2 = {
        eventname: "Event",
        ort: "Tübingen",
        zeit: "18 Uhr",
        gruppenname: "Zuhause",
        bemerkung: "Habt Spaß!"
    };

    let daten3 = {
        eventname: "Hallo",
        ort: "Hechingen",
        zeit: "19 Uhr",
        gruppenname: "Zuhause",
        bemerkung: "Ih Spaß!"
    };

    let daten4 = {
        eventname: "Hallo",
        ort: "Hechingen",
        zeit: "19 Uhr",
        gruppenname: "Zuhause",
        bemerkung: "Ih Spaß!"
    };

    res.json([daten1, daten2, daten3,daten4]);

    datenDieZurueckGehen = await eventDao.loadById(id);
    res.json(datenDieZurueckGehen);




    datenDieZurueckGehen = await eventDao.loadById(id);
    res.json(datenDieZurueckGehen);

})

router.post("/event/in/gruppe/erstellen", verifyToken, (req, res)=>{
    const {eventname, ort, zeit, bemerkung} = req.body;
    const eventDao = new EventDao(req.app.locals.dbConnection);
    eventDao.eventAnlegen(eventname, ort, zeit, bemerkung);
    res.status(200).json({message: 'Event erfolgreich angelegt'});
})


module.exports = router;