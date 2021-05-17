// start instance of Router
const router = require('express').Router();
// imports
const { notes } = require('../db/db.json');
const { saveNote, findById, validateNote, deleteNote } = require('../db/notes');

// add unique ids to notes
var shortid = require('shortid');




// route function to append /api to each url
router.get('/notes', (req, res) => {
    let results = notes;

    res.json(results);
});

router.get('/notes:id', (req, res) => {
    const result = findById(req.params.id, notes)
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    // set unique id for note and append
    req.body.id = shortid.generate();
    // validate data and deny if fields are empty
    if(!validateNote(req.body)) {
        res.status(404).send("Please complete each text field before saving.")
    } else {
        const note = saveNote(req.body, notes);
        res.json(note);
    }
    // const note = req.body;
    // db.get("notes").push({
    //     ...note,
    //     id: nanoid(6)
    // }).write();
    // res.json({ success: true });
});

router.post('/notes/:id', (req, res) => {
    const results = findById(req.param.id, notes);

    if (result) {
        res.json(results);
    } else {
        res.sendStatus(`Error: ${statusText}`);
    };
});

router.delete('/notes/:id', (req, res) => {
    const results = deleteNote(req.param.id, notes);
    res.json(results);
});

module.exports = router;