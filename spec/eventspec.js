var superagent = require('superagent');
describe('/events', function() {
	var agent = superagent.agent();
	it('should get all events', function(done) {
		agent.get('http://localhost:1337/event').end(function(err, res) {
			res.should.have.status(200);
			return done();
		});
	});
});

