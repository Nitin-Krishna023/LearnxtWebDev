const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	'd5afds4d8fl74m',
	'sytexdkoojxghm',
	'976ff9e2303c8ccf4cd246cb9990084fe469585c8981c507905a3ec7d4fe21b1',
	{
		logging: false,
		host: 'postgresql-flat-76936',
		dialect: 'postgres',
		dialectOptions: {
			dateStrings: true,
			typeCast: true,
			timezone: '+05:30'
		},
		timezone: '+05:30',
		operatorAliases: false
	}
);

module.exports = sequelize;
