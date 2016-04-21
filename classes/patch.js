'use strict';
module.exports = class Patch {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.isDirty = true;
	}

	//Cleans the dirt patch!
	//Returns false if it had previously been cleaned
	hoover() {
		if (this.isDirty) {
			this.isDirty = false;
			console.log('Cleaning dirt patch!');
			global.nCleanedPatches++;
			return true;
		}
		return false;
	}

};
