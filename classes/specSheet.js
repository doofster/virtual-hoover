'use strict';

//Importing classes
const Hoover = require('../classes/hoover.js');
const Patch = require('../classes/patch.js');
const Room = require('../classes/room.js');


module.exports = class SpecSheet {
	constructor(filePath, resolve, reject) {
		this.filePath = filePath;
		this.room = {};
		this.hoover = {};
		this.patchMap = new Map();
		this.instructions = [];
		this.lineIndex = 0;

		this.load(resolve, reject);
	}

	load(resolve, reject) {
		//Set up the file read operation (https://github.com/nodejs/node/pull/4609/files)
		const readline = require('readline');
		const fs = require('fs');

		//Let's put "this" in its own variable to bypass some variable scope problems inside the events below
		let specSheet = this;

		let stream = fs.createReadStream(this.filePath);
		stream.on('error', function(err) {
			reject('Error while attempting to read file!');
		});

		const rl = readline.createInterface({
			input: stream
		});

		rl.on('line', function(line) {
			specSheet.parse(line);
		}.bind(this));

		rl.on('close', function() {
			resolve(specSheet);
		}.bind(this));
	}

	parse(line) {
		if (line === undefined) {
			//console.log('end of the file');
			return;
		}
		console.log(`${this.lineIndex}:\t${line}`);
		if (this.lineIndex === 0) {
			let dimensions = line.split(" ");
			this.room = {
				width: parseInt(dimensions[0]),
				height: parseInt(dimensions[1])
			};
		} else if (this.lineIndex === 1) {
			let coordinates = line.split(" ");
			this.hoover = {
				x: parseInt(coordinates[0]),
				y: parseInt(coordinates[1])
			};
		} else {
			let coordinates = line.split(" ");
			if (coordinates.length === 2) {
				let patch = new Patch(parseInt(coordinates[0]), parseInt(coordinates[1]));
				this.patchMap.set(Patch.generatePatchKey(patch.x, patch.y), patch);
			} else {
				//Split all instructions into an array
				this.instructions = coordinates[0].split("");
			}
		}

		this.lineIndex++;
	}
};
