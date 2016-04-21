'use strict';

//Import config file
const config = require('../config.json');

//Importing classes
const Hoover = require('../classes/hoover.js');
const Patch = require('../classes/patch.js');
const Room = require('../classes/room.js');

//vars
let lineIndex = 0;
let currentLine;

let room;
let hoover;
let instructions;
let patchMap = new Map();


var initialize = function(callback) {
	//Set up the file read operation (https://github.com/nodejs/node/pull/4609/files)
	const readline = require('readline');
	const fs = require('fs');

	const rl = readline.createInterface({
		input: fs.createReadStream(config.inputFilePath)
	});

	rl.on('line', function(line) {
		parse(line);
	});

	rl.on('close', function() {
		global.hoover = hoover;
		global.room = room;
		global.patchMap = patchMap;
		global.instructions = instructions;
		global.nCleanedPatches = 0;
		callback();
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
		room = new Room(parseInt(dimensions[0]), parseInt(dimensions[1]));
	} else if (lineIndex === 1) {
		let coordinates = line.split(" ");
		hoover = new Hoover(parseInt(coordinates[0]), parseInt(coordinates[1]));
	} else {
		let coordinates = line.split(" ");
		if (coordinates.length === 2) {
			let patch = new Patch(parseInt(coordinates[0]), parseInt(coordinates[1]));
			patchMap.set(Patch.generatePatchKey(patch.x, patch.y), patch);
		} else {
			instructions = coordinates[0];
		}
	}

	lineIndex++;
};
module.exports.parse = parse;
