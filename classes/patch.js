'use strict';
module.exports = class Patch {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.isDirty = true;
	}

	//Cleans the dirt patch! Returns false if it had previously been cleaned
	hoover() {
		if (this.isDirty) {
			this.isDirty = false;
			//console.log('Cleaning dirt patch!');
			//global.nCleanedPatches++;
			return true;
		}
		return false;
	}

	//This function creates a Map of dirtpatches, using their coordinates as keys (e.g. "5,6" for patch with x = 5 and y = 6)
	static createPatchMap(patches) {
		let patchMap = new Map();

		//exit if list of patches is undefined
		if (patches === undefined) {
			return patchMap;
		}

		//iterate over patches and build map entries
		for (let patch of patches) {
			patchMap.set(Patch.generatePatchKey(patch.x, patch.y), patch);
		}

		console.log(patchMap);
		console.log('-----------\n');

		return patchMap;
	}

	static generatePatchKey(x, y) {
		return `${x},${y}`;
	}
};
