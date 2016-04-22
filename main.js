'use strict';

// Import classes
const Hoover = require('./classes/hoover.js');
const SpecSheet = require('./classes/spec-sheet.js');

// This is the entry point for the app.
// This function loads the specified file from the filePath parameter and will execute: the callback function upon success, the error function upon failure
let init = function(filePath, callback, error) {
	// Because the file read operation is asynchronous, let's leverage this fancy Promise API to handle our AJAX cleanly.
	// (More info on promises: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
	let readFile = new Promise(
		// Our promise will use the resolve() or reject() functions to handle the outcome of our async code
		function(resolve, reject) {
			// Let's spin up a "spec sheet" from the file specified in our config.json file
			let specSheet = new SpecSheet(filePath, resolve, reject);
		}
	);

	// Here we define what happens when our asynchronous code finishes.
	readFile.then( // The then() call handles the success case
			function(result) {
				//Once our spec sheet is fully loaded, let's call the callback method that passed into this init function
				callback(result);
			}
		)
		.catch( // The catch block handles the error case.
			function(reason) { // Display an error message before exiting
				console.log(`An error was encountered while putting together the spec sheet :(\n${reason}`);
				error();
			}
		);
};
module.exports.init = init; // Make this method accesible to the module

// This function takes in a specSheet and spins up a hoover.
// The hoover will then execute all its instructions.
// Optional callback will be run at the end
let run = function(specSheet, callback) {

	let hoover;

	hoover = bootUpHoover(specSheet);

	try { // Process all instructions one by one
		while (!hoover.processInstruction()) {
			//console.log('processing instruction');
		}

		//return; //That's it we're done!
	} catch (e) { // Display an error message before exiting
		console.log(`An error was encountered while processing an instruction :(\n${e}`);
	}

	module.exports.hoover = hoover; // Make this var accesible to the module

	//Only call the optional callback if it is defined
	if (callback) {
		callback();
	}

};
module.exports.run = run; // Make this method accesible to the module

let bootUpHoover = function(specSheet) {
	let hoover;
	try { // Instanciate a hoover from the resulting spec sheet
		hoover = new Hoover(specSheet);
	} catch (e) { // Display an error message before exiting
		console.log(`An error was encountered while booting up the hoover :(\n${e}`);
	}
	return hoover;
};
module.exports.bootUpHoover = bootUpHoover;
