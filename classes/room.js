'use strict';
module.exports = class Room {
	constructor(width, height, patchMap) {
		this.width = width;
		this.height = height;
		this.patchMap = patchMap;
	}

	/*//This method returns true if the given coordinates are inside the room
	contains(x, y) {
		console.log('x : ' + x);
		console.log('y : ' + y);
		console.log('this.width : ' + this.width);
		console.log('this.height : ' + this.height);
		return x > 0 && y > 0 && x < this.width && y < this.height;
	}*/
};
