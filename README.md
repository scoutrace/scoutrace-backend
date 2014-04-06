# sctrc
### Installation instructions
Set your persistent settings in config/local.js like so

```
module.exports = {

	port: process.env.PORT || 1337,

	environment: process.env.NODE_ENV || 'development',

	adapters: {
		mongo: {
			user: '',
			password: '',
			database: 'scoutrace'
		}
	}
};
```

