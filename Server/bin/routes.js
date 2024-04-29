app.post("/register", (req, res) => {
    const todo = req.body.todo;

    // Einfügen des ToDo-Elements in die SQLite-Datenbank
    /*db.run("INSERT INTO Landkreis (todo) VALUES (?)", [todo], (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("New ToDo item added:", todo);
        res.redirect("/");
    });
});*/










module.exports = app;



