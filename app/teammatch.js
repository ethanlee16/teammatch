var express = require('express');
var credentials = require('./credentials.js');
var mongoose = require('mongoose');


var app = express();
app.set('port',process.env.PORT || 3000);

app.use(function(req, res) {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

app.listen(app.get('port'), function () {
	console.log('Press Control + C to stop!');
});




var opts = {
	server: {
		socketOptions: {keepAlive: 1}
	}
};

switch(app.get('env')) {
	case 'development':
		mongoose.connect(credentials.mongo.development.connectionString, opts);
		break;
	case 'production':
		mongoose.connect(credentials.mongo.production.connectionString, opts);
		break;
	default:
		throw new Error("unknown exec env");
};


var User = require('./models/user.js');




