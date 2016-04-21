var LineByLineReader = require('line-by-line'),
lr = new LineByLineReader('input.txt');


var lineIndex = 0;
var instructions = {};

lr.on('error', function (err) {
  // 'err' contains error object
  console.log('Whoops, something went wrong: ' + err);

});

lr.on('line', function (line) {
  // 'line' contains the current line without the trailing newline character.

  //First line holds the room's dimensions
  if (lineIndex == 0){
    var roomX;
    var roomY;
    try {
      roomX = line.split(" ")[0];
      roomY = line.split(" ")[1];
    } catch (e){
      console.log("Bad room dimensions");
    }
    instructions.roomX = roomX;
    instructions.roomY = roomY;
  }

  //Second line holds the hoover's start position
  if (lineIndex == 1){
    var hooverX;
    var hooverY;
    try {
      hooverX = line.split(" ")[0];
      hooverY = line.split(" ")[1];
    } catch (e){
      console.log("Bad hoover start position");
    }
    instructions.hooverX = hooverX;
    instructions.hooverY = hooverY;
  }





  console.log(lineIndex + ':' + line);
  lineIndex++;
});

lr.on('end', function () {
  // All lines are read, file is closed now.
});
