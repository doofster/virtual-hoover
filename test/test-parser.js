/**
 * This test suite will make sure loading up an input file works properly and will make sure there are no uncaught exceptions when the input is faulty
 */

var expect = require('chai').expect;
var folder = './test/files/';

describe('Spec Sheet Parser', function() {
  describe('I - Find File', function() {
    it('should find valid files', function(done) {
      var app = require('../main.js');
      var testFilePath = folder + 'valid.txt';
      app.init(testFilePath,function(){done();});
    });
    it('should fail gracefully when missing file', function(done) {
      var app = require('../main.js');
      var testFilePath = folder + 'fake-file.txt';
      app.init(testFilePath,function(){done();}, done);
    });
  });

  describe('II - Parse File', function() {
    describe('* Success', function() {
      it('should parse valid data', function(done) {
        var app = require('../main.js');
        var testFilePath = folder + 'valid.txt';
        var callback = function(specSheet) {
          //console.log(specSheet);
          expect(specSheet.room.width).to.equal(5);
          expect(specSheet.room.height).to.equal(6);
          expect(specSheet.hoover.x).to.equal(1);
          expect(specSheet.hoover.y).to.equal(2);
          expect(specSheet.patchMap).to.be.a('Map');

          var patch = specSheet.patchMap.get( 1 + ',' + 0);
          expect(patch.x).to.equal(1);
          expect(patch.y).to.equal(0);
          expect(patch.isDirty).to.equal(true);

          var patch = specSheet.patchMap.get( 2 + ',' + 2);
          expect(patch.x).to.equal(2);
          expect(patch.y).to.equal(2);
          expect(patch.isDirty).to.equal(true);

          var patch = specSheet.patchMap.get( 2 + ',' + 3);
          expect(patch.x).to.equal(2);
          expect(patch.y).to.equal(3);
          expect(patch.isDirty).to.equal(true);

          done();
        }
        app.init(testFilePath,callback);
      });
    });
    describe('* Invalid Room', function() {
      it('should fail gracefully when zero width', function(done) {
        var app = require('../main.js');
        var testFilePath = folder + 'invalid-room-zero-width.txt';
        app.init(testFilePath,function(){done();}, done);
      });
      it('should fail gracefully when zero height', function(done) {
        var app = require('../main.js');
        var testFilePath = folder + 'invalid-room-zero-height.txt';
        app.init(testFilePath,function(){done();}, done);
      });
      it('should fail gracefully when missing dimension', function(done) {
        var app = require('../main.js');
        var testFilePath = folder + 'invalid-room-missing-dimension.txt';
        app.init(testFilePath,function(){done();}, done);
      });
      it('should fail gracefully when NaN', function(done) {
        var app = require('../main.js');
        var testFilePath = folder + 'invalid-room-NaN.txt';
        app.init(testFilePath,function(){done();}, done);
      });
    });
    describe('* Invalid Hoover', function() {
      it('should fail gracefully when zero x', function(done) {
        var app = require('../main.js');
        var testFilePath = folder + 'invalid-hoover-negative-x.txt';
        app.init(testFilePath,function(){done();}, done);
      });
      it('should fail gracefully when zero y', function(done) {
        var app = require('../main.js');
        var testFilePath = folder + 'invalid-hoover-negative-y.txt';
        app.init(testFilePath,function(){done();}, done);
      });
      it('should fail gracefully when missing coordinate', function(done) {
        var app = require('../main.js');
        var testFilePath = folder + 'invalid-hoover-missing-coordinate.txt';
        app.init(testFilePath,function(){done();}, done);
      });
      it('should fail gracefully when NaN', function(done) {
        var app = require('../main.js');
        var testFilePath = folder + 'invalid-hoover-NaN.txt';
        app.init(testFilePath,function(){done();}, done);
      });
    });
  });
});
