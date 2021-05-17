// require Express.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const { notes } = require('./db/db.json');

// instantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// set up Express.js middleware that instructs the server to make certain files available
// and not gated behind server endpoint.
// provide a file path to a location in the app, and instruct server to make these files static resources
// as a result: all front-end code can now be accessed w/o having specific server endpoint created for it
app.use(express.static('public'));

// tell the server that any time client navigates to <host>/api, app will use router we setup in apiRoutes
// if / is endpoint, router will serve back HTML routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// chain listen() method onto server to tell it listen for requests
app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}!`);
});