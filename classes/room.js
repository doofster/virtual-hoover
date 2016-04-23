'use strict';

/**
 * This class represents a room
 * Some attributes include:
 * - width and height dimensions
 * - a map of dirt patches
 */

// We are storing the class declaration as the module so it can be used easily in other files
module.exports = class Room {

	/**
	 * constructor - Simple constructor
	 *
	 * @param  Integer width    Room's width
	 * @param  Integer height   Room's height
	 * @param  Integer patchMap Room's map of dirt patches
	 */
	constructor(width, height, patchMap) {
		this.width = width;
		this.height = height;
		this.patchMap = patchMap;
	}
};
