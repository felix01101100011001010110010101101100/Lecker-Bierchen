const express = require('express');
var router = express.Router();
const LandkreisDao = require('../dao/landkreisDao.js');

router.get('/gib_landkreis_id', async (req, res) => {
    const {lk} = req.query;
    console.log(lk);
    const landkreisDao = new LandkreisDao(req.app.locals.dbConnection);
    id = await landkreisDao.landkreisId(lk)
    console.log('Service Landkreis: Landkreis id is ' + id);
    res.status(200).json({ id: id });
    
});






module.exports = router;