var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	email: String,
	authId: String,
	name: String,
	created: Date
});

var User = mongoose.model('User', userSchema);
module.exports = User;
