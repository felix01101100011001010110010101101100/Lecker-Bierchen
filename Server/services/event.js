const express = require('express');
const verifyToken = require('./verifyToken');
var router = express.Router();

router.get("/eventUebersicht", verifyToken, (req, res)=>{
    const eventDao = new EventDao(request.app.locals.dbConnection);

    anzahlMenschen = eventDao.anzahlMenschenImEvent(eventid);

    datenDieZurueckGehen = eventDao.loadById(id);
    

    res.send(datenDieZurueckGehen);


})


module.exports = router;