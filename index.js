'use strict';

//Import classes
const Patch = require('./classes/patch.js');

//Import utils
const input = require('./utils/input.js');
const output = require('./utils/output.js');

let driveHoover = function(specSheet) {
	let hoover = specSheet.hoover;
	global.patchMap = specSheet.patchMap; //This needs to be moved into the room class (or something)

	console.log(`Starting at: \t${hoover.output()}`);
	//Make sure we hoover on our starting position
	hoover.hooverPatch();


	for (let instruction of specSheet.instructions.split("")) {
			hoover.drive(instruction);
	}
	console.log(hoover.output());
};

var run = function(specSheet) {
	console.log(specSheet);
	console.log('===============');
	driveHoover(specSheet);
};

input.initialize(run);
