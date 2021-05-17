const fs = require('fs');
const path = require('path');
const { notes } = require('./db.json');

// function to create a new note
function saveNewNote(body, dbArray) {
    // function's main code will go here
    const noteContent = body;
    dbArray.push(noteContent);
    // using fs.writeFileSync() (synchronous version of fs.writeFil()) to write to db.json
    fs.writeFileSync(
      // path.join() method joins the value of __dirname (the directory of the file executing the code in) with the path to db.json file
      path.join(__dirname, './db.json'),
      // save JavaScript array data as JSON; null argument = don't edit existing data
      // 2 = the amount of white space created between variables (makes more legible)
      JSON.stringify({ notes: dbArray }, null, 2)
    );
    // return finished code to post route for response
    return console.log(`Note ${note.title} has been added successfully.`);
}

function findById(id, dbArray) {
    const result = dbArray.filter(notes => notes.id === id)[0];
    return result;
}

// delete a note from dbArray
function deleteNote(id, dbArray) {
    var selectedNote = findById(id, dbArray);
    var notesIndex = dbArray.indexOf(selectedNote);

    // remove note from array and create new dbArray
    newNoteArray = dbArray.splice(notesIndex, 1);

    fs.writeFileSync(
        path.join(__dirname, './db.json'),
        JSON.stringify({ notes: newNoteArray }, null, 2)
    );
    
};

// function to validate data
// in POST route's callback before creating and adding data, it will now pass through this function above
// if any data fails validation, the note will not be created (see app.post for error)
function validateNote(note) {
    if (!note.title) {
        return false;
    }
    if (!note.text) {
        return false;
    }
    return true;
};

module.exports = { saveNewNote, findById, deleteNote, validateNote };