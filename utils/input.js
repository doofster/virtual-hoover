'use strict';

//Importing classes
const Hoover = require('../classes/hoover.js');
const Patch = require('../classes/patch.js');
const Room = require('../classes/room.js');

var parse = function() {
	//Data prototype
	let specs = {
		room: new Room(5, 5),
		hoover: new Hoover(1, 2),
		patches: [
			new Patch(1, 0),
			new Patch(2, 2),
			new Patch(2, 3)
		],
		instructions: 'NNESEESWNWW'
	};
	return specs;
};
module.exports.parse = parse;
