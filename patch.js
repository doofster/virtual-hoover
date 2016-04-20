'use strict';
module.exports = class Patch {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isDirty = true;
  }
};
