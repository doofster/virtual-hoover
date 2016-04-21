'use strict';
module.exports = class Hoover {
	constructor(x, y) {
		this.x = x;
		this.y = y;
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

		this.sanitize();
		console.log(`* Driving ${instruction} ${driveX},${driveY}: \t${this.output()}`);
	}

	sanitize() {
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
		return `(${this.x},${this.y})`;
	}
};
