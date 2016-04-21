'use strict';

var print = function(hoover,nCleanedPatches){
  console.log('*************');
  console.log(`${hoover.x} ${hoover.y}\n${nCleanedPatches}`);
}

module.exports.print = print;
