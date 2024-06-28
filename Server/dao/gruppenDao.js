class GruppenDao{
    constructor(dbConnection){
        this.dbconnection = dbConnection;
    }
    neueGruppe(gruppenname, status, key, administrator) {
        return new Promise((resolve, reject) => {
            this.dbconnection.run("INSERT INTO Gruppe(gruppenname, status, key, administrator) VALUES(?,?,?,?)", [gruppenname, status, key, administrator], function(err) {
                if (err) {
                    reject(err);
                } else {
                    // `this` bezieht sich hier auf das Statement-Objekt, nach dem erstellen wird die ID des neu erstellten 
                    // objekts gherausgegeben sodss dann eine korrekte zuordnung in der Beziehungstabelle gemacht werden kann
                    resolve(this.lastID);
                }
            });
        });
    }

    alleGruppenDesBenutzers(personid) {
        
        return new Promise((resolve, reject) => {
            this.dbconnection.all("SELECT gruppenname, id FROM BeziehungPersonGruppe JOIN Gruppe ON BeziehungPersonGruppe.gruppenid = Gruppe.id WHERE BeziehungPersonGruppe.personid = ?", [personid], (err, rows) => {
                
                //this.dbconnection.all("SELECT gruppenname FROM Gruppe", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    // Transformiert das Ergebnis in das gewünschte Format
                    const formatierteDaten = rows.map(row => {
                        return { gruppenname: row.gruppenname , id: row.id};
                    });
                    resolve(formatierteDaten);
                }
            });
        });
    }

    gruppeBeitreten(personid, gruppenid){
        this.dbconnection.run("INSERT INTO BeziehungPersonGruppe(personid, gruppenid) VALUES(?,?)",[personid, gruppenid]);
    }

    getGruppenId(gruppenname){
        return new Promise((resolve, reject) => {
            this.dbconnection.get("SELECT id FROM Gruppe WHERE gruppenname=?", [gruppenname], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row.id);
                }
            });
        });
    }

    getEvents(gruppenid){
        return new Promise((resolve, reject) => {
            this.dbconnection.all("SELECT Event.id, eventname, ort, zeit, bemerkung FROM Event WHERE gruppeid=?", [gruppenid], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const formatierteDaten = rows.map(row => {
                        return { eventid:row.id, eventname: row.eventname, ort: row.ort, zeit: row.zeit, bemerkung: row.bemerkung};
                    });
                    resolve(formatierteDaten);
                }
            });
        });
    }

    getGruppenmitglieder(gruppenid){
        return new Promise((resolve, reject) => {
            this.dbconnection.all("SELECT id, jahr, benutzername FROM Person INNER JOIN BeziehungPersonGruppe ON BeziehungPersonGruppe.personid = Person.id WHERE gruppenid=?", [gruppenid], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                    
                }
            });
        });
    }
    getGruppenname(gruppenid){
        return new Promise((resolve, reject) => {
            this.dbconnection.get("SELECT gruppenname FROM Gruppe WHERE id=?", [gruppenid], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    gruppeVerlassen(personid, gruppenid){
        console.log(personid, gruppenid);
        this.dbconnection.run("DELETE FROM BeziehungPersonGruppe WHERE personid=? AND gruppenid=?", [personid, gruppenid], (err) => {
            if (err) {
                console.error("Error in gruppeVerlassen:", err);
            }
        });
    }
    

    getGruppenIdViaKey(key){
        return new Promise((resolve, reject) => {
            this.dbconnection.get("SELECT id FROM Gruppe WHERE key=?", [key], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row.id);
                }
            });
        });
    }

    getGruppenadmin(gruppenid){
        return new Promise((resolve, reject) => {
            this.dbconnection.get("SELECT administrator FROM Gruppe WHERE id=?", [gruppenid], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row.administrator);
                }
            });
        });
    }

    deleteGruppe(gruppenid){
        this.dbconnection.run("DELETE FROM Gruppe WHERE id=?", [gruppenid], (err) => {
            if (err) {
                console.error("Error in deleteGruppe:", err);
            }
        });
    }

    getKey(gruppenid){
        return new Promise((resolve, reject) => {
            this.dbconnection.get("SELECT key FROM Gruppe WHERE id=?", [gruppenid], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row.key);
                }
            });
        });
    }

    mitgliedEntfernen(personid, gruppenid){
        this.dbconnection.run("DELETE FROM BeziehungPersonGruppe WHERE personid=? AND gruppenid=?", [personid, gruppenid], (err) => {
            if (err) {
                console.error("Error in mitgliedEntfernen:", err);
            }
        });
    }

    gruppenname(gruppenid) {
        return new Promise((resolve, reject) => {
            this.dbconnection.get("SELECT * FROM Gruppe WHERE id=?", [gruppenid], (err, row) => {
                if (err) {
                    console.error("Error in gruppenname:", err);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }


}

module.exports = GruppenDao;