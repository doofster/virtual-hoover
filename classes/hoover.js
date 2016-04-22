'use strict';

//Importing classes
const Hoover = require('../classes/hoover.js');
const Patch = require('../classes/patch.js');
const Room = require('../classes/room.js');

module.exports = class Hoover {
	constructor(specSheet) {
		this.x = specSheet.hoover.x;
		this.y = specSheet.hoover.y;
		this.instructions = specSheet.instructions;
		this.room = new Room(specSheet.room.width, specSheet.room.height, specSheet.patchMap);
		this.nCleanedPatches = 0;

		//Make sure we hoover on our starting position
		this.hooverPatch();
	}

	drive(instruction) {
		if (instruction === undefined) {
			return false;
		}

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
		this.x += driveX;
		this.y += driveY;

		this.detectCollisions();
		this.hooverPatch();

		console.log(`* Driving ${instruction} ${driveX},${driveY}: \t${this.output()}`);
		return true;
	}

	hooverPatch() {
		let patch = this.room.patchMap.get(Patch.generatePatchKey(this.x, this.y));
		if (patch !== undefined) {
			if (patch.hoover()) {
				this.nCleanedPatches++;
			}
		}
	}

	detectCollisions() {

		let width = this.room.width;
		let height = this.room.height;

		if (this.x >= width) {
			this.x = width - 1;
		}
		if (this.x < 0) {
			this.x = 0;
		}
		if (this.y >= height) {
			this.y = height - 1;
		}
		if (this.y < 0) {
			this.y = 0;
		}
	}

	registerInstructions(instructions) {
		this.instructions = [];
		for (let instruction of instructions.split("")) {
			this.instructions.push(instruction);
		}
		console.log(`Instructions: ${this.instructions}`);
	}

	output() {
		return (`${this.x} ${this.y}\n${this.nCleanedPatches}`);
	}

	processInstruction() {
		let isDone = !this.drive(this.instructions.shift());

		if (isDone) {
			console.log('=============================');
			console.log(this.output());
		}

		return isDone;
	}
};
