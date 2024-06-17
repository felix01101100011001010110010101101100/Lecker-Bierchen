const express = require('express');
const verifyToken = require('./verifyToken');
var router = express.Router();

router.get("/gruppe/home/anzeigen", verifyToken, (req, res)=>{
    let daten1 = {
        gruppenname: "Niceer Dicer"
    };

    let daten2 = {
        gruppenname: "Die coolen Hosen"
    };
    
    let daten3 = {
        gruppenname: "Die coolen Hosen"
    }
    let daten4 = {
        gruppenname: "Die coolen Hosen"
    }

    res.json([daten1, daten2,daten3, daten4]);
})

module.exports = router;