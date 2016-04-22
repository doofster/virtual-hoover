'use strict';
/*
//Importing classes
const Hoover = require('../classes/hoover.js');
const Patch = require('../classes/patch.js');
const Room = require('../classes/room.js');

//vars
let lineIndex = 0;


//TODO move this somewhere better, not global;
let specSheet = {
	room : {},
	hoover : {},
	patchMap : new Map(),
	instructions: new Array()
}


var initialize = function(inputFilePath, callback) {
	//Set up the file read operation (https://github.com/nodejs/node/pull/4609/files)
	const readline = require('readline');
	const fs = require('fs');

	const rl = readline.createInterface({
		input: fs.createReadStream(inputFilePath)
	});

	rl.on('line', function(line) {
		parse(line);
	});

	rl.on('close', function() {
		console.log('========================');
		room.patchMap = patchMap;
		hoover.room = room;
		//TODO move this to constructor
		hoover.registerInstructions(instructions);
		callback(hoover);
	});
};
module.exports.initialize = initialize;

var parse = function(line) {
	if (line === undefined) {
		console.log('end of the file');

		return;
	}
	console.log(`${lineIndex}:\t${line}`);
	if (lineIndex === 0) {
		let dimensions = line.split(" ");
		specSheet.room = {
			width : parseInt(dimensions[0]),
			height : parseInt(dimensions[1])
		};
	} else if (lineIndex === 1) {
		let coordinates = line.split(" ");
		specSheet.hoover = {
			x : parseInt(coordinates[0]),
			y : parseInt(coordinates[1])
		};
	} else {
		let coordinates = line.split(" ");
		if (coordinates.length === 2) {
			let patch = new Patch(parseInt(coordinates[0]), parseInt(coordinates[1]));
			specSheet.patchMap.set(Patch.generatePatchKey(patch.x, patch.y), patch);
		} else {
			instructions = coordinates[0].split("");
		}
	}

	lineIndex++;
};
*/
