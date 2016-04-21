'use strict';

//Import classes
const Patch = require('./classes/patch.js');

//Import utils
const input = require('./utils/input.js');
const output = require('./utils/output.js');




let driveHoover = function() {
	global.nCleanedPatches = 0;
	console.log(`Starting at: \t${global.hoover.output()}`);
	for (let instruction of global.instructions.split("")) {
		global.hoover.drive(instruction);
		let patch = global.patchMap.get(Patch.generatePatchKey(global.hoover.x, global.hoover.y));
		if (patch !== undefined) {
			patch.hoover();
		}
	}
	output.print();
};

var run = function() {
	console.log(global.room);
	console.log(global.hoover);
	console.log(global.patchMap);
	console.log(global.instructions);
	console.log('===============');
	driveHoover();
};

input.initialize(run);
