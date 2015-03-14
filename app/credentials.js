module.exports = {
	mongo: {
		development: {
			connectionString: 'mongodb://hamedn:onjecton@ds031647.mongolab.com:31647/teammatch_dev'
		},
		production: {
			connectionString: 'your_connect;'
		}
	},

	providers: {
		facebook: {
			development: {
				appId: '328164610723232',
				appSecret: '0fe3629aaf838e5e5e5dbab6f34aac94'
			}
		}
	}

};
