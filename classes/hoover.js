'use strict';

//Importing classes
const Hoover = require('../classes/hoover.js');
const Patch = require('../classes/patch.js');
const Room = require('../classes/room.js');

module.exports = class Hoover {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.nCleanedPatches = 0;
	}

	drive(instruction) {
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
	}

	hooverPatch(){
		let patch = global.patchMap.get(Patch.generatePatchKey(this.x, this.y));
		if (patch !== undefined) {
			if (patch.hoover()){
				this.nCleanedPatches++;
			}
		}
	}

	detectCollisions() {

		console.log(Room.room);

		let width = 5;
		let height = 5;

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

	output() {
		return `${this.x} ${this.y}\n${this.nCleanedPatches}`;
	}
};
