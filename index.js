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

//Let's spin up a spec sheet from the file specified in our config.json file
let specSheet = new SpecSheet(config.inputFilePath);
