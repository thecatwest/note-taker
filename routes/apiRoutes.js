// start instance of Router
const router = require('express').Router();

// add unique ids to notes
var { nanoid } = require("nanoid");
var ID = nanoid(8);

// imports
const { createNewNote, findById, validateNote } = require('../db/db.json');
const { notes } = require('../db/db.json');

// route function to append /api to each url
router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes)
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    // set id using req.body and nanoid
    const note = req.body;
    db.get("notes").push({
        ...note,
        id: nanoid(6)
    }).write();
    res.json({ success: true });
});

module.exports = router;