class EventDao{
    constructor(dbConnection){
        this.dbconnection = dbConnection;
    }

    loadById(id) {  //alle daten für die übersicht laden
        return new Promise((resolve, reject) => {
            console.log(id)
            this.dbconnection.all("SELECT eventname,ort,zeit,bemerkung,gruppenname from Event INNER JOIN BeziehungPersonEvent ON BeziehungPersonEvent.eventid = Event.id INNER JOIN Gruppe ON Event.gruppeid = Gruppe.id wHERE personid=?", [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("hier")
                    console.log(row);
                    resolve(row);
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
        this.dbconnection.run("INSERT INTO Event(eventname, ort, zeit, bemerkung, gruppeid) VALUES(?,?,?,?,?)", [eventname, ort, zeit, bemerkung, gruppeid], (error) => {
            if (error) {
                console.error("Error in eventAnlegen:", error);
            }
        });
    }

    deleteEvent(eventid){
        this.dbconnection.run("DELETE FROM Event WHERE id=?", [eventid], (error) => {
            if (error) {
                console.error("Error in deleteEvent:", error);
            }
        });
    }


    dabei(id, eventname){
        this.dbconnection.run("INSERT INTO BeziehungPersonEvent(personid, eventid) VALUES(?,?)", [id, eventname], (error) => {
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

    
}

module.exports = EventDao;