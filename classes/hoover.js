'use strict';
module.exports = class Hoover {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  output() {
    return `(${this.x},${this.y})`;
  }
};
