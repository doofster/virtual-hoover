var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/api/hoover', function(request, response) {
  // Import config file
  const config = require('./config.json');

  // Import our app
  var app = require('./main.js');

  var callback = function(result){
    response.send(app.bootUpHoover(result));
  }

  // Initialize the app with the filepath specified in the config.json file
  // We are also passing in a callback as the second parameter: in this case we will tell the app to run() once the file is read.
  app.init(config.inputFilePath, callback);
})

app.get('/', function(req, res, next){
    return res.sendFile( __dirname + '/index.html');
});

app.get('/app.js', function(req, res, next){
    return res.sendFile( __dirname + '/app.js');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
