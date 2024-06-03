const express = require('express');
var router = express.Router();
const verifyToken = require('./verifyToken.js')
const PersonDao = require('../dao/personDao.js');
const jwt = require('jsonwebtoken');
const secretKey = 'geheimesSchluesselwort';
const tokenValidTime = '1h';


router.get('/person/eindeutig', async function(req, res) {
    const {bn} = req.query;
    const personDao = new PersonDao(req.app.locals.dbConnection);
    console.log('Service Person: Client requested one record, benutzername=' + bn);
    if (await res.status(200).json(personDao.personenDatenAbrufen(bn))) {
        const exists = true;
    } else {
        const exists = false;
    }
    return ;

});

router.post('/person/register', async (req, res) => {
    const {vn, nn, age, bn, hash, lk, führerschein} = req.body;
    const personDao = new PersonDao(req.app.locals.dbConnection);
        personDao.personenAnlegen(vn, nn, age, bn, hash, lk, führerschein)
        res.status(200).json({message: 'Person erfolgreich angelegt'});

});
    

// anmeldeversuch
router.post('/login', (req, res) => {
    const {bn, hash} = req.body;

        if (PersonDao.passwort() == hash) {
            console.log('Passwörter stimmen überein');
            const token = jwt.sign({ bne: bn }, secretKey);
            //token im header übermitteln
            res.header('Authorization', 'Bearer ' + token);
            //home.html soll gerendert werden
            res.sendFile(path.join(__dirname, '../public/html/home.html'));
            
        } else {
            res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
            console.log('Passwörter stimmen nicht überein');
        }
    });




//Funktion (oder was auch immer), um die Daten vom Server fürs Profil an Client zu senden
router.get("/profil", verifyToken, (req,res)=>{
    const personDao = new PersonDao(request.app.locals.dbConnection);

    try{
        datenDieZurueckGehen = personDao.personenDatenAbrufen();
        res.json(datenDieZurueckGehen);
    }
    catch(ex){
        response.status(400).json({"fehler": true, "nachricht": ex.message})
    }
    




    /*
    const username = req.user.bne;
    
    const query = "SELECT * FROM Person JOIN Landkreis ON Person.landkreisid = Landkreis.id WHERE benutzername=?";
    db.get(query, [username], (err, dbreturn)=>{
        if (err){
            console.error("Fehler beim Abrufen der Daten: ", err);
        }
        if(!dbreturn){
            return res.status(404).json({error: "Benutzer nicht gefunden"})
        }
        else {
            res.json(dbreturn); 
        }
    })
*/
    //var daten = 
    

});

module.exports = router;