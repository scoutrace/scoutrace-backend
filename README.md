# sctrc

### Create your first relation

Use "sails console" command for this

Create a Event

```
Event.create({name : 'something'}).exec(consol.log);
```

Create a activity and set the event

```
Activity.create({name : 'act 1', event : '534ffe648dd75110711580d1'}).exec(console.log);
```

Reqeust the event in the webinterface and see it be related

http://scoutrace.local:1337/event/534ffe648dd75110711580d1

Look into "find" action in "EventController" to see how

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

