const express = require('express');
var router = express.Router();
const verifyToken = require('./verifyToken.js')

const PersonDao = require('./PersonDao.js');

router.post('/register.html', (req, res) => {
    const {vn, nn, age, bn, psw, pswwdh, lk, führerschein} = req.body;
    const PersonDao = new PersonDao(req.app.locals.dbConnection);
    //das gienge auch mit Datenbankaufruf aber wir müssen ja nur bestehen
    const personDao = new PersonDao(db, req);


});


// anmeldeversuch
router.post('/login', (req, res) => {
    const {bn, psw} = req.body;
   
    //hier könnte man doch bestimmt ne sql injection machen
   db.get("SELECT passwort FROM Person WHERE benutzername = ?", [bn], (err, datenbankreturn) => {
    
    if (err) {
        console.error('Fehler beim Abrufen des Benutzers aus der Datenbank:', err);
        return;
    }
    if (!datenbankreturn.passwort) {
        console.log('Benutzer nicht gefunden');
        return;
    }


    bcrypt.compare(psw, datenbankreturn.passwort, (err, result) => {
        if (err) {
            console.error('Fehler beim Vergleichen der Passwörter:', err);
            return;
        }
        if (result) {
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
    });
});



//Funktion (oder was auch immer), um die Daten vom Server fürs Profil an Client zu senden
app.get("/api/profil", verifyToken, (req,res)=>{
    var datenDieZurueckGehen = personDao.personenDatenAbrufen(request.app.locals.dbConnection);
    res.json(datenDieZurueckGehen);







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