const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'postgres', 'password', {
	logging: false,
	host: 'localhost',
	dialect: 'postgres',
	dialectOptions: {
		dateStrings: true,
		typeCast: true,
		timezone: '+05:30'
	},
	timezone: '+05:30',
	operatorAliases: false
});

module.exports = sequelize;
