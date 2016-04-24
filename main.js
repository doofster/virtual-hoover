'use strict';

/**
 * This module contains all the logic needed to:
 *  - Load up specifications from a file
 *  - Set up a Hoover from a spec sheet
 *  - Pilot the Hoover around
 */

// Import classes
const Hoover = require('./classes/hoover.js');
const SpecSheet = require('./classes/spec-sheet.js');

/**
 * init - This function loads the specified file into a spec sheet and will execute:
 * 					- the callback function upon success
 * 					-	the error function upon failure
 *
 * @param  String 	filePath 	The path of the spec sheet file
 * @param  Function callback 	The function to run once the spec sheet file has been read
 * @param  Function error    	The function to run if an error is encountered (Used only in unit tests)
 */
let init = function(filePath, callback, error) {

	// Because the file read operation is asynchronous, let's leverage this fancy Promise API to handle our AJAX cleanly. (More info on promises: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
	let readFile = new Promise(

		// Our promise will use the resolve() or reject() functions to handle the outcome of our async code
		function(resolve, reject) {

			// Let's spin up a spec sheet from the specified file
			let specSheet = new SpecSheet(filePath, resolve, reject);
		}
	);

	// Here we define what happens when our asynchronous code finishes.
	readFile.then(
			// The then() call handles the success case (i.e. when the resolve function above gets called)
			function(result) {
				// Quick check to ensure the function is defined
				if (callback) {
					// Once our spec sheet is fully loaded, let's call the callback method that passed into this init function
					callback(result);
				}
			}
		)
		.catch(
			// The catch block handles the error case.
			function(reason) {
				// Display an error message before exiting
				console.log(`An error was encountered while putting together the spec sheet :(\n${reason}`);

				// Quick check to ensure the function is defined
				if (error) {
					// Run the error function that was passed in as a parameter
					error();
				}
			}
		);
};
module.exports.init = init; // Make this method accesible to the module

/**
 * run - This method sets up a Hoover from a spec sheet and executes all its driving instructions
 *
 * @param  SpecSheet	specSheet	The specifications for the Hoover
 * @param  Function 	callback	An optional callback to run at the end of the method. (Used in unit tests)
 */
let run = function(specSheet, callback) {

	// Initialize the Hoover
	let hoover = bootUpHoover(specSheet);
	processInstructions(hoover);

	module.exports.hoover = hoover; // Make the Hoover accesible to the module

	//Only call the optional callback if it is defined
	if (callback) {
		callback();
	}

};
module.exports.run = run; // Make this method accesible to the module

/**
 * bootUpHoover - This method is responsible for returning a Hoover from a given spec sheet
 *
 * @param  SpecSheet specSheet 	The specifications for the Hoover
 * @return Hoover           		The instanciated Hoover
 */
let bootUpHoover = function(specSheet) {
	let hoover;

	// Wrap our code in a try-catch for good measure
	try {
		// Instanciate a hoover from the resulting spec sheet
		hoover = new Hoover(specSheet);
	} catch (e) {
		// Display an error message before exiting
		console.log(`An error was encountered while booting up the hoover :(\n${e}`);
	}
	return hoover;
};
module.exports.bootUpHoover = bootUpHoover;


/**
 * processInstructions - This method will execute all of the Hoover's instructions one by one until there are none left
 *
 * @param  Hoover hoover The Hoover to operate
 */
let processInstructions = function(hoover) {
	// Wrap our code in a try-catch for good measure
	try {
		// Process all instructions one by one until there are none left
		while (!hoover.processInstruction()) {
			// Nothing happening here
		}
	} catch (e) {
		// Display an error message before exiting
		console.log(`An error was encountered while processing an instruction :(\n${e}`);
	}
};
