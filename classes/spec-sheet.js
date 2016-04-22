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

		const readline = require('readline');
		const fs = require('fs');

		//Let's put "this" in its own variable to bypass some variable scope problems inside the events below
		let specSheet = this;

		//Set up the file read stream following best practices (https://github.com/nodejs/node/pull/4609/files)
		let stream = fs.createReadStream(this.filePath);
		const rl = readline.createInterface({
			input: stream
		});

		//The 'error' event gets kicked off when a read error happens
		stream.on('error', function(err) {
			//Exit by rejecting the promise with an error message
			reject('Error while attempting to read file.');
		});

		//The 'line' event gets kicked off each time a line is read
		rl.on('line', function(line) {
			//Parse the line
			specSheet.parse(line, reject);
		});

		//The 'close' event gets kicked off when all lines have been read
		rl.on('close', function() {

			//Make sure there is at least one instruction
			if (specSheet.instructions.length === 0) {
				reject('Missing instructions');
			}

			//Return the filled out spec sheet by resolving the promise
			resolve(specSheet);
		});
	}

	parse(line, reject) {
		if (line === undefined) {
			return;
		}
		//console.log(`${this.lineIndex}:\t${line}`);
		//First line corresponds to room dimensions
		if (this.lineIndex === 0) {
			try {
				//Parse the space-delimited dimensions
				let dimensions = this.parseCoordinates(line);

				//If there aren't 2 non-zero positive dimensions, throw exception
				if (dimensions.length < 2 || dimensions.x < 1 || dimensions.y < 1) {
					throw 'goof';
				} else {
					//Store the data and go on to the next line
					this.room = {
						width: dimensions.x,
						height: dimensions.y
					};
				}
			} catch (e) {
				//All exceptions in this block reject the promise with the appropriate error message
				reject('Bad room dimensions.');
			}
			//Second line corresponds to hoover starting position
		} else if (this.lineIndex === 1) {
			try {
				//Parse the space-delimited coordinates
				let coordinates = this.parseCoordinates(line);

				//If there isn't the right number of coordinates and they lie outside the room, throw exception
				if (this.isOutsideRoom(coordinates.x, coordinates.y)) {
					throw 'goof';
				} else {
					//Store the data and go on to the next line
					this.hoover = coordinates;
				}
			} catch (e) {
				//All exceptions in this block reject the promise with the appropriate error message
				reject('Bad hoover starting position.');
			}
			//All following lines can be either patch coordinates, or instructions
		} else {
			let coordinates = line.split(" ");
			//If there are two coordinates, assume that it is a patch coordinate
			if (coordinates.length === 2) {
				try {
					let patch = new Patch(parseInt(coordinates[0]), parseInt(coordinates[1]));
					this.patchMap.set(Patch.generatePatchKey(patch.x, patch.y), patch);
				} catch (e) {
					//All exceptions in this block reject the promise with the appropriate error message
					reject('Bad patch position.');
				}
			} else {
				try {
					this.instructions = this.parseInstructions(line);
				} catch (e) {
					//All exceptions in this block reject the promise with the appropriate error message
					reject('Bad instruction.');
				}
			}
		}
		this.lineIndex++;
	}

	//TODO make static
	isOutsideRoom(x, y) {
		return (x < 0 || y < 0 || x >= this.room.width || y >= this.room.height);
	}

	//TODO make static
	parseCoordinates(line) {
		let coordinates = line.split(" ");

		if (coordinates.length < 2 || isNaN(parseInt(coordinates[0])) || isNaN(parseInt(coordinates[1]))) {
			throw 'goof';
		}

		return {
			x: parseInt(coordinates[0]),
			y: parseInt(coordinates[1])
		};
	}

	//TODO make static
	parseInstructions(instructionString) {
		let instructions = [];

		//There must be at least one instruction
		if (instructionString.length < 1) {
			throw 'goof';
		}

		//Split all instructions into an array and loop over each instruction
		for (let instruction of instructionString.split("")) {
			instruction = instruction.toUpperCase();

			if (instruction !== 'N' && instruction !== 'E' && instruction !== 'S' && instruction !== 'W') {
				throw 'goof';
			}
			instructions.push(instruction);
		}

		return instructions;
	}
};
