var ids = require('./local.js').ids;
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google').Strategy;

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function (err, user) {
    	done(err, user);
	});
});

passport.use(new FacebookStrategy({
	clientID: ids.facebook.clientID,
	clientSecret: ids.facebook.clientSecret,
	callbackURL: ids.facebook.callbackURL
},
function(accessToken, refreshToken, profile, done) {
	process.nextTick(function () {
		return done(null, profile);
	});
}));

module.exports = {
	express: {
		customMiddleware: function(app){
			app.use(passport.initialize());
			app.use(passport.session());
		}
	}
};
