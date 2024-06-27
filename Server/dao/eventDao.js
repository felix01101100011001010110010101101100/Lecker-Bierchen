class EventDao{
    constructor(dbConnection){
        this.dbconnection = dbConnection;
    }

    loadById(id) {  //alle daten für die übersicht laden
        return new Promise((resolve, reject) => {
            console.log(id)
            this.dbconnection.all("SELECT Event.id, eventname,ort,zeit,bemerkung,gruppenname,fahrer from Event INNER JOIN BeziehungPersonEvent ON BeziehungPersonEvent.eventid = Event.id INNER JOIN Gruppe ON Event.gruppeid = Gruppe.id wHERE personid=?", [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const formatierteDaten = rows.map(row => {
                        return { eventid:row.id, eventname: row.eventname, ort: row.ort, zeit: row.zeit, bemerkung: row.bemerkung, gruppenname: row.gruppenname, fahrer: row.fahrer};
                    });
                    resolve(formatierteDaten);
                }
            });
        });
    }

    anzahlMenschenImEvent(eventid){
        this.dbconnection.get("SELECT count(*) FROM Event INNER JOIN BeziehungPersonEvent ON Event.id=BeziehungPersonEvent.eventid WHERE eventid=?", [eventid], (error, row) => {
            if (error) {
                console.error("Error in anzahlMenschenImEvent:", error);
                return;
            }
        });
    }

    eventAnlegen(eventname, ort, zeit, bemerkung, gruppeid){
        return new Promise((resolve, reject) => {
            this.dbconnection.run("INSERT INTO Event(eventname, ort, zeit, bemerkung, gruppeid) VALUES(?,?,?,?,?)", [eventname, ort, zeit, bemerkung, gruppeid], function(error) {
                if (error) {
                    console.error("Error in eventAnlegen:", error);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    deleteEvent(eventid){
        this.dbconnection.run("DELETE FROM Event WHERE id=?", [eventid], (error) => {
            if (error) {
                console.error("Error in deleteEvent:", error);
            }
        });
    }


    dabei(personid, eventid){
        this.dbconnection.run("INSERT INTO BeziehungPersonEvent(personid, eventid) VALUES(?,?)", [personid, eventid], (error) => {
            if (error) {
                console.error("Error in dabei:", error);
            }
        });
    }

    getTeilnehmer(eventid){
        return new Promise((resolve, reject) => {
            this.dbconnection.all("SELECT personid FROM BeziehungPersonEvent WHERE eventid=?", [eventid], (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    fahrerFestlegen(eventid, personid){
        this.dbconnection.run("UPDATE Event SET fahrer=? WHERE id=?", [personid, eventid], (error) => {
            if (error) {
                console.error("Error in fahrerFestlegen:", error);
            }
        });
    }
}

module.exports = EventDao;