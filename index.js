

var specs = {
  roomX : 5,
  roomY : 5,
  hooverX : 1,
  hooverY : 2,
  dirtPatches : [
    {
      x : 1,
      y : 0
    },
    {
      x : 2,
      y : 2
    },
    {
      x : 2,
      y : 3
    }
  ],
  instructions : 'NNESEESWNWW'
  //instructions : 'NNNNNNNNNNESSSSSSSSSSSSENNNNNNNNNNNNESSSSSSSSSSSSWWWWWWWWWWWWWWW'
};

console.log(specs);

var initialize = function(specs){
  //exit if null
  if (!specs) {
    return !specs;
  }

  var dirtPatchMap = new Map();
  for (patch of specs.dirtPatches){
     dirtPatchMap.set(`${patch.x},${patch.y}`,false);
  }
  specs.dirtPatchMap = dirtPatchMap;
  console.log(dirtPatchMap);
  return specs;
};

specs = initialize(specs);

var sanitizeXY = function(specs){
  if (specs.hooverX == specs.roomX){
    specs.hooverX = specs.roomX - 1;
  }
  if (specs.hooverX == -1){
    specs.hooverX = 0;
  }
  if (specs.hooverY == specs.roomY){
    specs.hooverY = specs.roomY - 1;
  }
  if (specs.hooverY == -1){
    specs.hooverY = 0;
  }
  return specs;
}



var driveHoover = function(specs){
  var nCleanedPatches = 0;
  console.log(`Starting at ${specs.hooverX},${specs.hooverY}`);
  for (instruction of specs.instructions.split("")){
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
    specs.hooverX += driveX;
    specs.hooverY += driveY;
    specs = sanitizeXY(specs);
    console.log(`Driving ${instruction} ${driveX},${driveY}: ${specs.hooverX},${specs.hooverY}`);

    if (specs.dirtPatchMap.get(`${specs.hooverX},${specs.hooverY}`) === false){
      console.log('Cleaning dirt patch!');
      specs.dirtPatchMap.set(`${specs.hooverX},${specs.hooverY}`, true);
      console.log(specs.dirtPatchMap);
      nCleanedPatches++;
    }
  }

  console.log(`nCleanedPatches ${nCleanedPatches}`);


};
driveHoover(specs);
