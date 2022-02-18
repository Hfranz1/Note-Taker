const fs = require('fs');
const path = require('path')

module.exports = route1 => {

    //note variable
    fs.readFile("db.dbjason", "utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        //Set up API and notes routes
        route1.get("/api/notes", function (req, res) {
            //read bd.json file and retun all svaed notes 
            res.json(notes);
        });
        route1.post("/api/notes", function (req, res) {
            //receives a new note
            let newNote = req.body;
            notes.push(newNote);
            updateDB();
            res.json(notes);
        });

        //retrieves a note with a id
        route1.get("/api/notes/:id", function (req, res) {
            //display json for the notes array of id
            res.json(notes[req.params.id]);
        });

        //deletes note by id
        route1.delere("/api/notes/:id", function (req, res) {
            notes.splice(req.params.id, 1);
            updateDB();
            res.json(notes);
        });

        //display notes.html when notes is accessed
        route1.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        //display index.html when routes are accessed
        route1.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file whenever a note is added and deleted
        function updateDB() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}