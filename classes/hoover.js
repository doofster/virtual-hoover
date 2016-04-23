'use strict';

/**
 * This class represents the Hoover.
 *
 * Some attributes include:
 * 	-	x and y coordinates
 * 	- driving instructions
 * 	- the room that it is in
 * 	- the number of patches it has cleaned
 *
 * The methods will provide functionality for processing insturctions, driving around, and cleaning dirt patches.
 *
 */

// Import classes
const Patch = require('../classes/patch.js');
const Room = require('../classes/room.js');

// We are storing the class declaration as the module so it can be used in other files
module.exports = class Hoover {


	/**
	 * constructor - This constructor instanciates our Hoover bot from a SpecSheet.
	 *
	 * @param  SpecSheet specSheet All the information gathered from the file read operation
	 */
	constructor(specSheet) {
		// Pull the data out of the spec sheet
		this.x = specSheet.hoover.x;
		this.y = specSheet.hoover.y;
		this.instructions = specSheet.instructions;

		// Create a Room instance
		this.room = new Room(specSheet.room.width, specSheet.room.height, specSheet.patchMap);

		// Initialize the number of cleaned patches
		this.nCleanedPatches = 0;

		// Make sure we hoover on our starting position
		this.hooverPatch();
	}


	/**
	 * drive - This method updates the Hoover's coordinates based on the driving instruction it is given
	 *
	 * @param  String instruction 	The cardinal point to drive towards
	 * @return Boolean             	False if the instruction is invalid
	 */
	drive(instruction) {

		// If the instruction is undefined, signal the program that list of instructions is empty by returning false
		if (instruction === undefined) {
			return false;
		}

		// We will increment the Hoover's X and Y coordinates by driveX and driveY respectively
		let driveX = 0;
		let driveY = 0;

		// There are 4 possible cardinal points to drive towards
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

		// Update the Hoover's coordinates
		this.x += driveX;
		this.y += driveY;

		// Make sure we aren't trying to drive through a wall
		this.detectCollisions();

		// Clean eventual dirt patches that might now be in the same position as the Hoover
		this.hooverPatch();

		// Return success
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
		//console.log(`Instructions: ${this.instructions}`);
	}

	output() {
		process.stdout.write(`${this.x} ${this.y}\n${this.nCleanedPatches}`);
	}

	processInstruction() {
		let isDone = !this.drive(this.instructions.shift());

		if (isDone) {
			this.output();
		}

		return isDone;
	}
};
