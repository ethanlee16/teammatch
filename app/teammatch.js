var express = require('express');
var credentials = require('./credentials.js');
var mongoose = require('mongoose');


var app = express();
app.set('port',process.env.PORT || 3000);


var MongoSessionStore = require('session-mongoose')(require('connect'));
var sessionStore = new MongoSessionStore({ url: credentials.mongo.development.connectionString });


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

var auth = require('./lib/auth.js')(app, {
	providers: credentials.providers,
	successRedirect: '/account',
	failureRedirect: '/unauthorized'
});

auth.init();
auth.registerRoutes();


app.get('/account', function(req,res) {
	if(!req.session.passport.user)
		res.send('Unauthorized');
	else
		res.send('Authorized!!! :)');
})
app.use(function(req, res) {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});
