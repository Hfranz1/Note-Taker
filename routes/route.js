const router = require('express').Router()

const fs = require('fs');
const path = require('path')

//note variable
fs.readFile("./db/db.json", "utf8", (err, data) => {

    if (err) throw err;

    var notes = JSON.parse(data);

    //Set up API and notes routes
    router.get("/api/notes", function (req, res) {
        //read bd.json file and retun all svaed notes 
        res.json(notes);
    });
    router.post("/api/notes", function (req, res) {
        //receives a new note
        let newNote = req.body;
        notes.push(newNote);
        updateDB();
        res.json(notes);
    });

    //retrieves a note with a id
    router.get("/api/notes/:id", function (req, res) {
        //display json for the notes array of id
        res.json(notes[req.params.id]);
    });

    //deletes note by id
    router.delete("/api/notes/:id", function (req, res) {
        notes.splice(req.params.id, 1);
        updateDB();
        res.json(notes);
    });

    //display notes.html when notes is accessed
    router.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    //display index.html when routes are accessed
    router.get('*', function (req, res) {
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

module.exports = router;