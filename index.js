'use strict';

//Import classes
const Hoover = require('./classes/hoover.js');
const SpecSheet = require('./classes/spec-sheet.js');

//Import config file
const config = require('./config.json');

let run = function(hoover) {
	console.log(`Starting at: \t${hoover.output()}`);
};

//input.initialize(config.inputFilePath, run);




// Because the file read operation is asynchronous, let's leverage this fancy Promise API to handle our AJAX cleanly.
// (More info on promises: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
let readFile = new Promise(
	// Our promise will use the resolve or reject function to handle the outcome of our async code
	function(resolve, reject) {
		// Let's spin up a "spec sheet" from the file specified in our config.json file
		let specSheet = new SpecSheet(config.inputFilePath, resolve, reject);
	}
);

// Here we define what happens when our asynchronous code finishes.
readFile.then(
		// The then() call handles the success case
		function(result) {

			let hoover = new Hoover(result);
			while (!hoover.processInstruction()) {
				//console.log('processing instruction');
			}
		}
	)
	.catch(
		// The catch block handles the error case.
		function(reason) {
			//Display an error message before exiting
			console.log(`An error was encountered while putting together the spec sheet: ${reason} :(`);
		}
	);
