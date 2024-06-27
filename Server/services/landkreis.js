const express = require('express');
var router = express.Router();
const LandkreisDao = require('../dao/landkreisDao.js');

router.get('/gib_landkreis_id', async (req, res) => {
    try {
        const {lk} = req.query;
        console.log(lk);
        const landkreisDao = new LandkreisDao(req.app.locals.dbConnection);
        const id = await landkreisDao.landkreisId(lk);
        console.log('Service Landkreis: Landkreis id is ' + id);
        if (id) {
            res.status(200).json({ id: id });
        } else {
            // Wenn keine ID gefunden wurde, sende eine 404-Antwort
            res.status(404).json({ message: 'Landkreis nicht gefunden' });
        }
    } catch (error) {
        console.error('Fehler bei der Abfrage der Landkreis ID:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
    
});






module.exports = router;