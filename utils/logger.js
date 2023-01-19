const { createLogger, format, transports } = require('winston');

// const transportation = new transports.MongoDB()

module.exports = createLogger({
	transports:[
		new transports.Console({
			format:format.combine(
				format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
				format.align(),
				format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
			)
		}),

		// new transports.File({
		// filename: 'logs/server.log',
		// level: 'info',
		// format:format.combine(
		// 	format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
		// 	format.align(),
		// 	format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
		// )}),
		//
		
		// new transports.MongoDB({
		// 	db : process.env.MONGO_URI,
		// 	level: 'error',
		// 	options: {
		// 		useUnifiedTopology: true
		// 	},
		// 	collection: 'Rhinojon Logs',
		// 	format: format.combine(
		// 		format.timestamp(),
		// 		format.json()
		// 	)
		// })
	]
});