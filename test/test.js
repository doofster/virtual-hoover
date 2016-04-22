var expect = require('chai').expect;
var folder = './test/files/';

describe('Run Through', function() {
  describe('I - Top to bottom', function() {
    it('should solve the run from the prompt', function(done) {

      var app = require('../main.js');
      var testFilePath = './test/files/input.txt';

      var callback = function(){
        expect(app.hoover.x).to.equal(1);
        expect(app.hoover.y).to.equal(3);
        expect(app.hoover.nCleanedPatches).to.equal(1);
        done();
      }

      app.init(testFilePath,function(result){app.run(result,callback);});
    });
  });
});
