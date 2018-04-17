var express = require('express');
var path = require('path');
//var bodyParser = require('body-parser');
var app = express();

// Set Static Folder (angular 2 stuff)
app.use(express.static(path.join(__dirname, '../client/dist')));

// Create Routes
var routes = require('./routes');
app.use('/', routes);

app.listen(3000, function () {
	console.log('Example listening on port 3000!');
});

module.exports = app; 
