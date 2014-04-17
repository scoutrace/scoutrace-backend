module.exports = {
	saveUser: function(userid, user, provider, req, res) {
		User.findOne({uid:userid},function(err, myuser) {
			if (err || (myuser == undefined)) {
				User.create({
					provider: provider,
					uid: ''+user.id,
					name: user.username,
					email: user.emails[0].value,
					firstname: user.name.givenName,
					lastname: user.name.familyName
				}).done(function(err, user) {
					// Error handling
					if (err) {
						res.redirect('/');
						return;
					// The User was created successfully!
					} else {
						req.session.user = user;
						res.redirect('/');
						return;
					}
				});
			} else {
				req.session.user = myuser;
				res.redirect('/');
				return;
			}
		});
	}
};
