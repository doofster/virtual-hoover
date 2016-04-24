'use strict';

/**
 * This class represents a spec sheet
 *
 * Its attributes represent the information found in the input file.
 * Its methods will provide the mechanism for loading the spec sheet from a specified file path
 */

//Importing classes
const Hoover = require('../classes/hoover.js');
const Patch = require('../classes/patch.js');
const Room = require('../classes/room.js');

// We are storing the class declaration as the module so it can be used easily from other files
module.exports = class SpecSheet {

	/**
	 * constructor - 	The constructor for the spec sheet.
	 * 								Loading up the spec sheet is an asynchronous process, thus the following methods will need to juggle callbacks for the success and error cases.
	 *
	 * @param  String 	filePath	The file path of the input file that will be loaded
	 * @param  Function resolve  	The method that will be called once the operation finishes successfully
	 * @param  function reject   	The method that will be called if the operation fails
	 */
	constructor(filePath, resolve, reject) {
		// Initializing our vars
		this.filePath = filePath;
		this.room = {};
		this.hoover = {};
		this.patchMap = new Map();
		this.instructions = [];
		this.lineIndex = 0;

		// load up the file
		this.load(resolve, reject);
	}

	/**
	 * load - This method will load the file into the spec sheet
	 *
	 * @param  Function resolve  	The method that will be called once the operation finishes successfully
	 * @param  function reject   	The method that will be called if the operation fails
	 */
	load(resolve, reject) {

		// load up some modules for file reading
		const readline = require('readline');
		const fs = require('fs');

		// Let's put "this" in its own variable to bypass some variable scope problems inside the events below
		let specSheet = this;

		// Set up the file read stream following best practices (https://github.com/nodejs/node/pull/4609/files)
		let stream = fs.createReadStream(this.filePath);
		const rl = readline.createInterface({
			input: stream
		});

		// The 'error' event gets kicked off when a read error happens
		stream.on('error', function(err) {
			// Exit by rejecting the promise with an error message
			reject('Error while attempting to read file.');
		});

		// The 'line' event gets kicked off each time a line is read
		rl.on('line', function(line) {
			// Parse the line
			specSheet.parse(line, reject);
		});

		// The 'close' event gets kicked off when all lines have been read
		rl.on('close', function() {
			// Make sure there is at least one instruction
			if (specSheet.instructions.length === 0) {
				reject('Missing instructions');
			}

			// Return the filled out spec sheet by resolving the promise
			resolve(specSheet);
		});
	}


	/**
	 * parse - This method parses a given line of text into spec sheet data
	 *
	 * @param  String 	line		The line to parse
	 * @param  Function reject 	The function to call in case of an error
	 */
	parse(line, reject) {
		// If the line is garbage, return
		if (line === undefined) {
			return;
		}

		// First line corresponds to room dimensions
		if (this.lineIndex === 0) {
			// Wrap in try catch for proper error handling
			try {
				// Parse line
				this.parseRoomDimensions(line);
			} catch (e) {
				//All exceptions in this block reject the promise with the appropriate error message
				reject('Bad room dimensions.');
			}

			//Second line corresponds to hoover starting position
		} else if (this.lineIndex === 1) {
			// Wrap in try catch for proper error handling
			try {
				// Parse line
				this.parseHooverPosition(line);
			} catch (e) {
				// All exceptions in this block reject the promise with the appropriate error message
				reject('Bad hoover starting position.');
			}

			// All following lines can be either patch coordinates, or instructions
		} else {
			let currentLineIsPatch;

			// Figure out if we are dealing with patch coordinates or instruction set
			try {
				currentLineIsPatch = this.isPatch(line);
			} catch (e) {
				reject('Malformed file');
			}

			// If the line is a set of patch coordinates
			if (currentLineIsPatch) {
				try {
					// Parse line
					this.parsePatchPosition(line);
				} catch (e) {
					// All exceptions in this block reject the promise with the appropriate error message
					reject('Bad patch position.');
				}
				// Else if the line is a sequence of driving instructions
			} else {
				try {
					// Parse line
					this.parseInstructions(line);
				} catch (e) {
					// All exceptions in this block reject the promise with the appropriate error message
					reject('Bad instruction.');
				}
			}
		}
		this.lineIndex++;
	}


	/**
	 * isOutsideRoom - 	This method checks if the given coordinates are inside of the defined room
	 * 									TODO make this helper method static
	 *
	 * @param  Integer  x Coordinate
	 * @param  Integer  y Coordinate
	 * @return Boolean  True if the given coordinates lie outside of the room
	 */
	isOutsideRoom(x, y) {
		// If the room or coordinates are not defined, return true by default
		if (!this.room || !isInteger(x) || !isInteger(x)) {
			return true;
		}
		// Check coordinates against the rooms dimensions
		return (x < 0 || y < 0 || x >= this.room.width || y >= this.room.height);
	}


	/**
	 * isPatch - 	This method determines whether the current line is a set of patch coordinates or a sequence of driving instructions
	 * 						TODO make this helper method static
	 *
	 * @param  String 	line 	The line of text to parse
	 * @return Boolean  			True if the line is a set of patch coordinates. False if the line is a sequence of driving instructions
	 */
	isPatch(line) {
		let coordinates = line.split(" ");
		//If there is a space in the string, assume that it is a patch coordinate
		return (coordinates.length > 1);
	}

	/**
	 * parseCoordinates -		This method turns a space separated pair of coordinates into a set of two integers
	 * 											TODO make this helper method static
	 *
	 * @param  String	line	The line of text from the file containing the pair of coordinates
	 * @return Object      	The set of coordinates
	 */
	parseCoordinates(line) {
		let coordinates = line.split(" ");

		if (coordinates.length < 2 || !Number.isInteger(parseInt(coordinates[0])) || !Number.isInteger(parseInt(coordinates[1]))) {
			throw 'goof';
		}

		return {
			x: parseInt(coordinates[0]),
			y: parseInt(coordinates[1])
		};
	}

	/**
	 * parseInstructions -	This method turns a sequence of instructions into a list of instructions
	 *
	 * @param  String	line	The line of text from the file containing the instruction sequence
	 * @return String[]     The list of instructions
	 */
	parseInstructions(instructionString) {
		let instructions = [];

		// There must be at least one instruction
		if (instructionString.length < 1) {
			throw 'goof';
		}

		// Split all instructions into an array and loop over each instruction
		for (let instruction of instructionString.split("")) {
			// Normalize our instructions
			instruction = instruction.toUpperCase();

			// Spot checking for correct inputs
			if (instruction !== 'N' && instruction !== 'E' && instruction !== 'S' && instruction !== 'W') {
				throw 'goof';
			}

			// Add to the list
			instructions.push(instruction);
		}

		this.instructions = instructions;

		return this.instructions;
	}

	/**
	 * parseRoomDimensions -	This method turns a sequence of dimensions and stores it in the spec sheet
	 *
	 * @param  String	line	The line of text from the file containing the dimensions sequence
	 * @return Object				The room dimensions object
	 */
	parseRoomDimensions(roomDimensionString) {
		// Parse the space-delimited dimensions
		let dimensions = this.parseCoordinates(roomDimensionString);

		// If there aren't 2 non-zero positive dimensions, throw exception
		if (dimensions.length < 2 || dimensions.x < 1 || dimensions.y < 1) {
			throw 'goof';
		} else {
			// Store the data
			this.room = {
				width: dimensions.x,
				height: dimensions.y
			};
		}
		return this.room;
	}

	/**
	 * parseHooverPosition -	This method turns a sequence of coordinates into the Hoover's starting position and stores it in the spec sheet
	 *
	 * @param  String	line	The line of text from the file containing the coordinates sequence
	 * @return Object				The hoover position object
	 */
	parseHooverPosition(hooverPositionString) {
		// Parse the space-delimited coordinates
		let coordinates = this.parseCoordinates(hooverPositionString);

		// If there isn't the right number of coordinates and they lie outside the room, throw exception
		if (this.isOutsideRoom(coordinates.x, coordinates.y)) {
			throw 'goof';
		} else {
			// Store the data and go on to the next line
			this.hoover = coordinates;
		}

		return this.hoover;
	}

	/**
	 * parsePatchPosition -	This method turns a sequence of coordinates into a Patch and stores it in the spec sheet
	 *
	 * @param  String	line	The line of text from the file containing the coordinates sequence
	 * @return Object				The patch
	 */
	parsePatchPosition(patchPositionString) {
		let patch;

		// Parse the space-delimited coordinates
		let coordinates = this.parseCoordinates(patchPositionString);

		// If there isn't the right number of coordinates and they lie outside the room, throw exception
		if (this.isOutsideRoom(coordinates.x, coordinates.y)) {
			throw 'goof';
		} else {
			patch = new Patch(coordinates.x, coordinates.y);
			this.patchMap.set(Patch.generatePatchKey(patch.x, patch.y), patch);
		}

		return patch;
	}
};


/**
 * isNumber - Helper function to determine if a variable is a valid integer
 * @param  Integer  x
 * @return {Boolean}   [description]
 */
function isInteger(x) {
	return !isNaN(x + 1) && x !== false && x !== null && x !== "" && Number.isInteger(x);
}
