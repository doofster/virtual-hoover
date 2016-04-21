'use strict';

//Importing classes
const Hoover = require('./classes/hoover.js');
const Patch = require('./classes/patch.js');
const Room = require('./classes/room.js');

//Importing config file
const config = require('./config.json');

//Importing utils
const output = require('./utils/output.js');

//Data prototype
let specs = {
	room: new Room(5, 5),
	hoover: new Hoover(1, 2),
	patches: [
		new Patch(1, 0),
		new Patch(2, 2),
		new Patch(2, 3)
	],
	instructions: 'NNESEESWNWW'
};

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

specs.patchMap = createPatchMap(specs.patches);

let sanitizeXY = function(specs) {
	if (specs.hoover.x == specs.room.width) {
		specs.hoover.x = specs.room.width - 1;
	}
	if (specs.hoover.x == -1) {
		specs.hoover.x = 0;
	}
	if (specs.hoover.y == specs.room.height) {
		specs.hoover.y = specs.room.height - 1;
	}
	if (specs.hoover.y == -1) {
		specs.hoover.y = 0;
	}
	return specs;
};



let driveHoover = function(specs) {
	let nCleanedPatches = 0;
	console.log(`Starting at: \t${specs.hoover.output()}`);
	for (let instruction of specs.instructions.split("")) {
		let driveX = 0;
		let driveY = 0;
		switch (instruction) {
			case "N":
				driveY = 1;
				break;
			case "E":
				driveX = 1;
				break;
			case "S":
				driveY = -1;
				break;
			case "W":
				driveX = -1;
				break;
		}
		specs.hoover.x += driveX;
		specs.hoover.y += driveY;
		specs = sanitizeXY(specs);
		console.log(`* Driving ${instruction} ${driveX},${driveY}: \t${specs.hoover.output()}`);

		let patch = specs.patchMap.get(`${specs.hoover.x},${specs.hoover.y}`);
		if (patch !== undefined) {
			//to do make nCleanedPatches global so it can be called from patch.hoover()
			if (patch.hoover()) {
				nCleanedPatches++;
			}
			//console.log(specs.patchMap);

		}
	}
	output.print(specs.hoover, nCleanedPatches);
};
driveHoover(specs);
