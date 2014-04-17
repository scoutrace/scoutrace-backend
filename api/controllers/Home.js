module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to EventController)
   */
  _config: {},

	index: function(req, res) {
		return res.view({isAdmin: true});
	}
};
