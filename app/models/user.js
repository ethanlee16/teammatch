var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var portfolioItem = new Schema({
	name: String,
	description: String,
	images: [String] //urls of images
})


var userSchema = new Schema({
	username: String,
	password: String,
	userType:String, //Hacker | Hustler | Designer
	skills: String, //Node.js, Javascript, Rails, etc. (autocomplete on this)


	porfolio: [portfolioItem], //properties: name, description, image
	awards: [String], //ex: Codeday 1st Place, MHacks Twilio Prize Winner
	links: [String], //things like link to personal website, github page
	lookingFor: String, // paragraph about who the person is seeking
	email: String,
	authId: String,
	name: String,
	created: Date
});

var User = mongoose.model('User', userSchema);
module.exports = User;
