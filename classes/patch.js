'use strict';

/**
 * This class represents a dirt patch
 * Some attributes include:
 * - x and y coordinates
 * - whether the patch is dirty or cleaned up
 */

// We are storing the class declaration as the module so it can be used easily in other files
module.exports = class Patch {

	/**
	 * constructor - This constructor initializes a dirt patch
	 *
	 * @param  Integer x The x coordinate
	 * @param  Integer y The y coordinate
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.isDirty = true;
	}

	/**
	 * hoover - This method cleans the dirt patch
	 *
	 * @return Boolean True if the dirt patch hadn't been cleaned before
	 */
	hoover() {
		// If hasn't been cleaned yet
		if (this.isDirty) {
			// Mark it as cleaned and return true
			this.isDirty = false;
			return true;
		}

		// Return false if patch has already been cleaned
		return false;
	}

	/**
	 * static - This helper method will generate a key to store the patch in a Map
	 *
	 * @param  Integer x 	The x coordinate
	 * @param  Integer y 	The y coordinate
	 * @return String   	The generated map key
	 */
	static generatePatchKey(x, y) {
		return `${x},${y}`;
	}
};
