/**
 * This test suite will make sure our Hoover is running correctly
 */

var expect = require('chai').expect;
var folder = './test/files/';
var Hoover = require('../classes/hoover.js');
var Patch = require('../classes/patch.js');

describe('Hoover', function() {
  describe('I - Driving', function() {
    it('should drive in the right directions', function() {
      var specSheet = {
        room: {
          width : 5,
          height : 5
        },
        hoover: {
          x: 0,
          y: 0
        },
        instructions : [],
        patchMap : new Map()
      }
      var hoover = new Hoover(specSheet);
      expect(hoover.x).to.equal(0);
      expect(hoover.y).to.equal(0);

      hoover.drive('N');
      expect(hoover.x).to.equal(0);
      expect(hoover.y).to.equal(1);

      hoover.drive('E');
      expect(hoover.x).to.equal(1);
      expect(hoover.y).to.equal(1);

      hoover.drive('S');
      expect(hoover.x).to.equal(1);
      expect(hoover.y).to.equal(0);

      hoover.drive('W');
      expect(hoover.x).to.equal(0);
      expect(hoover.y).to.equal(0);

    });
    it('should not run into walls', function() {
      var specSheet = {
        room: {
          width : 5,
          height : 5
        },
        hoover: {
          x: 0,
          y: 0
        },
        instructions : [],
        patchMap : new Map()
      }
      var hoover = new Hoover(specSheet);
      expect(hoover.x).to.equal(0);
      expect(hoover.y).to.equal(0);

      hoover.drive('S');
      expect(hoover.x).to.equal(0);
      expect(hoover.y).to.equal(0);

      hoover.drive('W');
      expect(hoover.x).to.equal(0);
      expect(hoover.y).to.equal(0);

      hoover.drive('N');
      hoover.drive('N');
      hoover.drive('N');
      hoover.drive('N');
      expect(hoover.x).to.equal(0);
      expect(hoover.y).to.equal(4);

      hoover.drive('N');
      expect(hoover.x).to.equal(0);
      expect(hoover.y).to.equal(4);

      hoover.drive('E');
      hoover.drive('E');
      hoover.drive('E');
      hoover.drive('E');
      expect(hoover.x).to.equal(4);
      expect(hoover.y).to.equal(4);

      hoover.drive('E');
      expect(hoover.x).to.equal(4);
      expect(hoover.y).to.equal(4);
    });
  });
  describe('II - Hoovering', function() {
    it('should clean patches once, even the starting patch', function() {
      var specSheet = {
        room: {
          width : 5,
          height : 5
        },
        hoover: {
          x: 0,
          y: 0
        },
        instructions : [],
        patchMap : new Map()
      }
      specSheet.patchMap.set('0,0', new Patch(0,0));
      specSheet.patchMap.set('0,1', new Patch(0,1));
      specSheet.patchMap.set('1,1', new Patch(1,1));
      specSheet.patchMap.set('1,0', new Patch(1,0));
      var hoover = new Hoover(specSheet);
      expect(hoover.nCleanedPatches).to.equal(1);

      hoover.drive('N');
      expect(hoover.nCleanedPatches).to.equal(2);

      hoover.drive('E');
      expect(hoover.nCleanedPatches).to.equal(3);

      hoover.drive('S');
      expect(hoover.nCleanedPatches).to.equal(4);

      hoover.drive('W');
      expect(hoover.nCleanedPatches).to.equal(4);

      hoover.drive('N');
      expect(hoover.nCleanedPatches).to.equal(4);

      hoover.drive('E');
      expect(hoover.nCleanedPatches).to.equal(4);

      hoover.drive('S');
      expect(hoover.nCleanedPatches).to.equal(4);

      hoover.drive('W');
      expect(hoover.nCleanedPatches).to.equal(4);

      hoover.drive('N');
      hoover.drive('N');
      hoover.drive('E');
      hoover.drive('E');
      hoover.drive('N');
      hoover.drive('E');
      expect(hoover.nCleanedPatches).to.equal(4);
    });
  });
});
