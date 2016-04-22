'use strict';

//Importing classes
const Hoover = require('../classes/hoover.js');
const Patch = require('../classes/patch.js');
const Room = require('../classes/room.js');


module.exports = class SpecSheet {
	constructor(filePath, callback) {
		this.filePath = filePath;
		this.room = {};
		this.hoover = {};
		this.patchMap = new Map();
		this.instructions = [];
		this.lineIndex = 0;

		this.load();
	}

	load() {
		//Set up the file read operation (https://github.com/nodejs/node/pull/4609/files)
		const readline = require('readline');
		const fs = require('fs');
		let specSheet = this;
		console.log('doofsheet');
		console.log(specSheet);
		let parse = this.parse;

		const rl = readline.createInterface({
			input: fs.createReadStream(this.filePath)
		});

		rl.on('line', function(specSheet, line) {
			//console.log('doof loine');
			//console.log(specSheet);
			parse(line, specSheet);
		}.bind(this, specSheet));

		rl.on('close', function(specSheet) {
			console.log(specSheet);
			/*console.log('========================');
			room.patchMap = patchMap;
			hoover.room = room;
			//TODO move this to constructor
			hoover.registerInstructions(instructions);*/
			//callback(this.hoover);
			//
			//console.log(this);
		}.bind(this, specSheet));
	}

	parse(line, specSheet) {
		if (line === undefined) {
			console.log('end of the file');

			return;
		}
		console.log(`${specSheet.lineIndex}:\t${line}`);
		if (specSheet.lineIndex === 0) {
			let dimensions = line.split(" ");
			specSheet.room = {
				width: parseInt(dimensions[0]),
				height: parseInt(dimensions[1])
			};
		} else if (specSheet.lineIndex === 1) {
			let coordinates = line.split(" ");
			specSheet.hoover = {
				x: parseInt(coordinates[0]),
				y: parseInt(coordinates[1])
			};
		} else {
			let coordinates = line.split(" ");
			if (coordinates.length === 2) {
				let patch = new Patch(parseInt(coordinates[0]), parseInt(coordinates[1]));
				specSheet.patchMap.set(Patch.generatePatchKey(patch.x, patch.y), patch);
			} else {
				//Split all instructions into an array
				specSheet.instructions = coordinates[0].split("");
			}
		}

		specSheet.lineIndex++;
	}
};
