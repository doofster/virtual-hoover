var express = require('express');
var server = express();
var hoover;

server.set('port', (process.env.PORT || 5000));
server.use(express.static(__dirname + '/public'));

server.get('/api/hoover', function(request, response) {
	// Import config file
	const config = require('./config.json');

	// Import our app
	var app = require('./main.js');

	var callback = function(result) {
		hoover = app.bootUpHoover(result);
		response.send(hoover);
	};

	// Initialize the app with the filepath specified in the config.json file
	// We are also passing in a callback as the second parameter: in this case we will tell the app to run() once the file is read.
	app.init(config.inputFilePath, callback);
});

server.get('/', function(req, res, next) {
	return res.sendFile(__dirname + '/bonus/index.html');
});

server.get('/app.js', function(req, res, next) {
	return res.sendFile(__dirname + '/bonus/app.js');
});

server.listen(server.get('port'), function() {
	console.log("Node app is running at localhost:" + server.get('port'));
});
