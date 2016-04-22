'use strict';

//Import classes
const Patch = require('./classes/patch.js');
const SpecSheet = require('./classes/specSheet.js');

//Import config file
const config = require('./config.json');

//Import utils
const input = require('./utils/input.js');
const output = require('./utils/output.js');

var run = function(hoover) {
	console.log(`Starting at: \t${hoover.output()}`);
	//Make sure we hoover on our starting position TODO: move this in the class logic
	hoover.hooverPatch();

	while (!hoover.processInstruction()) {
		//console.log('processing instruction');
	}
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
			console.log('donezo');
			console.log(result);
		}
	)
	.catch(
		// The catch block handles the error case.
		function(reason) {
			console.log('Handle rejected promise (' + reason + ') here.');
		}
	);
