/**
 * AuthController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');
var authHelper = require('../services/authenticationHelpers');

module.exports = {

    index: function (req, res) {
        res.view();
    },

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },

	status: function (req, res) {
		res.json({ authenticated : req.isAuthenticated() });
	},

    // http://developer.github.com/v3/
    // http://developer.github.com/v3/oauth/#scopes
    github: function (req, res) {
        passport.authenticate('github', { failureRedirect: '/login' },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        res.view('500');
                        return;
                    }
					var userid = user.id;
					user.name = {};
					user.name.givenName = user.displayName.split(' ')[0];
					user.name.familyName = user.displayName.split(' ')[1];
					authHelper.saveUser(userid, user, req, res);
                });
            })(req, res);
    },

    // https://developers.facebook.com/docs/
    // https://developers.facebook.com/docs/reference/login/
    facebook: function (req, res) {
        passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        res.view('500');
                        return;
                    }
					var userid = user.id;
					authHelper.saveUser(userid, user, req, res);
                });
            })(req, res);
    },

    twitter: function (req, res) {
        passport.authenticate('twitter', { failureRedirect: '/login', scope: ['email'] },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        res.view('500');
                        return;
                    }
					var userid = user.id;
					user.name = {};
					user.name.givenName = user.displayName;
					user.name.familyName = user.displayName;
					if (!user.emails) {
						user.emails = [{value:'NONE'}];
					}
					authHelper.saveUser(userid, user, req, res);
                });
            })(req, res);
    },
    // https://developers.google.com/
    // https://developers.google.com/accounts/docs/OAuth2Login#scope-param
    google: function (req, res) {
        passport.authenticate('google', { failureRedirect: '/login', scope:['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        res.view('500');
                        return;
                    }
					console.log(user);
                    res.redirect('/');
                    return;
                });
            })(req, res);
    },


    /**
    * Overrides for the settings in `config/controllers.js`
    * (specific to AuthController)
    */
    _config: {}


};
