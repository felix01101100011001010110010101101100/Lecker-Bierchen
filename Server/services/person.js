const path = require('path');
const express = require('express');
var router = express.Router();
const verifyToken = require('./verifyToken.js')
const PersonDao = require('../dao/personDao.js');
const jwt = require('jsonwebtoken');
const secretKey = 'geheimesSchluesselwort';
const tokenValidTime = '1h';
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/person/eindeutig', async function(req, res) {
    const {bn} = req.query;
    const personDao = new PersonDao(req.app.locals.dbConnection);
    var exists = true;
    if (await personDao.personenDatenAbrufen(bn)) {
        exists = true;
    } else {
        exists = false;
    }
    res.status(200).json(exists);

});


router.post('/person/register', async (req, res) => {
    const {vn, nn, age, bn, psw, lk, führerschein} = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(psw, salt);

    const personDao = new PersonDao(req.app.locals.dbConnection);
    personDao.personenAnlegen(vn, nn, age, bn, hash, lk, führerschein)
    res.status(200).json({message: 'Person erfolgreich angelegt'});

});
    

// anmeldeversuch
router.post('/person/login', async (req, res) => {
    const {bn, psw} = req.body
   
    const personDao = new PersonDao(req.app.locals.dbConnection);
        if (await personDao.comparePassword(bn, psw)) {
            console.log('Passwörter stimmen überein');
            const token = jwt.sign({ bne: bn }, secretKey);
            //token im header übermitteln
            res.header('Authorization', 'Bearer ' + token);
            //home.html soll gerendert werden
            res.sendFile(path.join(__dirname, '../../public/html/home.html'));
            
        } else {
            res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
            console.log('s');
        }
    });




//Profil anzeigen
router.get("/profil", verifyToken, async (req,res)=>{
    const personDao = new PersonDao(req.app.locals.dbConnection);
    const username = req.user.bne;
    
    try{
        const daten = await personDao.personAnzeigen(username);
        res.send(daten);
    }
    catch(ex){
        res.status(400).send({"fehler": true, "nachricht": ex.message})
    }
});

module.exports = router;