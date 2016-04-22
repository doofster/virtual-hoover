'use strict';

// Import config file
const config = require('./config.json');

// Import our app
let app = require('./main.js');

// Initialize the app with the filepath specified in the config.json file
// We are also passing in a callback as the second parameter: in this case we will tell the app to run() once the file is read.
app.init(config.inputFilePath, app.run);
