var express = require('express');
var credentials = require('./credentials.js');
var mongoose = require('mongoose');
var handlebars = require('express3-handlebars')
	.create({
		defaultLayout:'main',
		helpers: {
			section: function(name,options) {
				if (!this._sections) {
                    this._sections = {};
        }
        this._sections[name] = options.fn(this);
                return null;
			},
			static: function(name) {
            return require('./lib/static.js').map(name);
      }
		}

	});


var app = express();
app.set('port',process.env.PORT || 3000);
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');



//Setup application basics
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


//Setup user stuff
var MongoSessionStore = require('session-mongoose')(require('connect'));
var sessionStore = new MongoSessionStore({ url: credentials.mongo.development.connectionString });
var User = require('./models/user.js');
var auth = require('./lib/auth.js')(app, {
	providers: credentials.providers,
	successRedirect: '/account',
	failureRedirect: '/unauthorized'
});
auth.init();
auth.registerRoutes();

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());


//Session & security middle-ware
app.use(require('csurf')());
app.use(function(req, res, next){
	res.locals._csrfToken = req.csrfToken();

	res.locals.loggedIn = true;
	if(!req.session.passport.user)
		res.locals.loggedIn = false;
	else
		res.locals.loggedIn = true;

	next();
});



//Routing
app.get('/account/profile', function(req,res) {
	if(!req.session.passport.user)
		res.redirect('/');
	else
		res.render('profile');
})
app.get('/', function(req,res) {
	res.render('index');
})
app.use(function(req, res) {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});
