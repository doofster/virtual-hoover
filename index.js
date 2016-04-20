'use strict';
const Hoover = require('./hoover.js');
const Patch = require('./patch.js');
const Room = require('./room.js');

var specs = {
  room : new Room(5,5),
  hoover : new Hoover(1,2),
  patches : [
    new Patch(1,0),
    new Patch(2,2),
    new Patch(2,3)
  ],
  instructions : 'NNESEESWNWW'
};

console.log(specs);
console.log('-----------\n');

var initialize = function(specs){
  //exit if null
  if (!specs) {
    return !specs;
  }

  var patchMap = new Map();
  for (let patch of specs.patches){
     patchMap.set(`${patch.x},${patch.y}`,patch);
  }
  specs.patchMap = patchMap;
  console.log(patchMap);
  console.log('-----------\n');
  return specs;
};

specs = initialize(specs);

var sanitizeXY = function(specs){
  if (specs.hoover.x == specs.room.width){
    specs.hoover.x = specs.room.width - 1;
  }
  if (specs.hoover.x == -1){
    specs.hoover.x = 0;
  }
  if (specs.hoover.y == specs.room.height){
    specs.hoover.y = specs.room.height - 1;
  }
  if (specs.hoover.y == -1){
    specs.hoover.y = 0;
  }
  return specs;
}



var driveHoover = function(specs){
  var nCleanedPatches = 0;
  console.log(`Starting at: \t${specs.hoover.output()}`);
  for (let instruction of specs.instructions.split("")){
    var driveX = 0;
    var driveY = 0;
    switch(instruction) {
      case "N" :
        driveY = 1;
        break;
      case "E" :
        driveX = 1;
        break;
      case "S" :
        driveY = -1;
        break;
      case "W" :
        driveX = -1;
        break;
    }
    specs.hoover.x += driveX;
    specs.hoover.y += driveY;
    specs = sanitizeXY(specs);
    console.log(`* Driving ${instruction} ${driveX},${driveY}: \t${specs.hoover.output()}`);

    var patch = specs.patchMap.get(`${specs.hoover.x},${specs.hoover.y}`);
    if (patch != null && patch.isDirty){
      console.log('Cleaning dirt patch!');
      patch.isDirty = false;
      console.log(specs.patchMap);
      nCleanedPatches++;
    }
  }
  console.log('------------\n');
  console.log(`nCleanedPatches ${nCleanedPatches}`);
};
driveHoover(specs);


console.log('------------');
