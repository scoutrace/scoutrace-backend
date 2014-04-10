/**
 * MyFileController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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

var fs = require('fs');
var path = require('path');
var uploaddir = 'uploads';
module.exports = {
    
    upload : function(req, res) {
		//Check that file is a correct type that is wanted
        if (req.method === 'POST') {           
            // read temporary file
            fs.readFile(req.files.testFile.path, function (err, data) {
                // save file
                var newPath = path.join(uploaddir, req.files.testFile.name);
                fs.writeFile(newPath, data, function (err) {
                    if (err) res.view({err: err});
                    // redirect to next page
                    res.redirect('confirm');
                });

            });
        } else {
            res.view();
        }
    },


	list: function(req, res) {
		var files = fs.readdirSync(uploaddir);
		res.view({
			filelist: files
		});
	},
	getfile: function(req, res) {
		//TODO: Put useraccess here
		fs.createReadStream(path.join(uploaddir, req.param('filename')), {
  'bufferSize': 4 * 1024
}).pipe(res);
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MyFileController)
   */
  _config: {
	}

  
};
