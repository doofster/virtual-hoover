'use strict';

/**
 * This class represents the Hoover.
 *
 * Some attributes include:
 * 	-	x and y coordinates
 * 	- driving instructions
 * 	- the room that it is in
 * 	- the number of patches it has cleaned so far
 *
 * The methods will provide functionality for processing insturctions, driving around, and cleaning dirt patches.
 *
 */

// Import classes
const Patch = require('../classes/patch.js');
const Room = require('../classes/room.js');

// We are storing the class declaration as the module so it can be used easily in other files
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


	/**
	 * hooverPatch - This method will clean whatever patch is in the Hoover's current position
	 */
	hooverPatch() {
		// Look for a dirt patch in the Hoover's current position
		let patch = this.room.patchMap.get(Patch.generatePatchKey(this.x, this.y));

		// If there is a patch
		if (patch !== undefined) {
			// Clean the patch
			if (patch.hoover()) {
				// If the patch hasn't been cleaned already, increment the running count of cleaned patches
				this.nCleanedPatches++;
			}
		}
	}


	/**
	 * detectCollisions - This method corrects the Hoover's coordinates if it drives into a wall
	 */
	detectCollisions() {

		// Store into vars for cleaner syntax
		let width = this.room.width;
		let height = this.room.height;

		// Adjust x if it goes beyond right wall
		if (this.x >= width) {
			this.x = width - 1;
		}
		// Adjust x if it goes beyond left wall
		if (this.x < 0) {
			this.x = 0;
		}

		// Adjust width if it goes beyond top wall
		if (this.y >= height) {
			this.y = height - 1;
		}

		// Adjust width if it goes beyond bottom wall
		if (this.y < 0) {
			this.y = 0;
		}
	}


	/**
	 * output - This method outputs the Hoover's position and number of cleaned patches
	 */
	output() {
		// Write directly to STDOUT instead of console.log()-ing because console.log() throws in extra formatting (i.e. "\n" at the end of each output)
		process.stdout.write(`${this.x} ${this.y}\n${this.nCleanedPatches}`);
	}


	/**
	 * processInstruction - This method will process the next instruction
	 *
	 * @return Boolean  True if the Hoover has no more instructions
	 */
	processInstruction() {

		// Remove and return the first instruction from the list of instructions
		let nextInstruction = this.instructions.shift();

		// Attempt to drive in that direction
		let isDone = !this.drive(nextInstruction);

		// If the Hoover has no more instructions
		if (isDone) {
			// Output its state to STDOUT
			this.output();
		}

		// Return whether the Hoover is done or not
		return isDone;
	}
};
