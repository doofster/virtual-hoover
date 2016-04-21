'use strict';

//Importing config file
const config = require('./config.json');

//Importing utils
const input = require('./utils/input.js');
const output = require('./utils/output.js');

let specs = input.parse();
console.log(specs);
console.log('-----------\n');


//This function creates a Map of dirtpatches, using their coordinates as keys (e.g. "5,6" for patch with x = 5 and y = 6)
let createPatchMap = function(patches) {

	let patchMap = new Map();

	//exit if list of patches is null
	if (!patches) {
		return patchMap;
	}

	//iterate over patches and build map entries
	for (let patch of patches) {
		patchMap.set(`${patch.x},${patch.y}`, patch);
	}

	console.log(patchMap);
	console.log('-----------\n');

	return patchMap;
};



let driveHoover = function() {
	global.nCleanedPatches = 0;
	console.log(`Starting at: \t${global.hoover.output()}`);
	for (let instruction of global.instructions.split("")) {
		global.hoover.drive(instruction);
		let patch = global.patchMap.get(`${global.hoover.x},${global.hoover.y}`);
		if (patch !== undefined) {
			patch.hoover();
		}
	}
	output.print();
};

global.hoover = specs.hoover;
global.patchMap = createPatchMap(specs.patches);
global.instructions = specs.instructions;

driveHoover();
