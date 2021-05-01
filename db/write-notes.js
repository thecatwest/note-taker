const fs = require('fs');
const path = require('path');
const { notes } = require('./db.json');

// function to create a new note
function createNewNote(body, notesArray) {
    // function's main code will go here
    const note = body;
    notesArray.push(note);
    // using fs.writeFileSync() (synchronous version of fs.writeFil()) to write to db.json
    fs.writeFileSync(
      // path.join() method joins the value of __dirname (the directory of the file executing the code in) with the path to db.json file
      path.join(__dirname, './db.json'),
      // save JavaScript array data as JSON; null argument = don't edit existing data
      // 2 = the amount of white space created between variables (makes more legible)
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    // return finished code to post route for response
    return body;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

// function to validate data
// in POST route's callback before creating and adding data, it will now pass through this function above
// if any data fails validation, the note will not be created (see app.post for error)
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

module.exports = { createNewNote, findById, validateNote };