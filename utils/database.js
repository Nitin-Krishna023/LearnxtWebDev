const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
// 	'ddd1568m1evt7b',
// 	'haxfrojdvotrhl',
// 	'20bda4bb4f4efdc6243e9d3ba4dba1e1b1febaaca88047c7f47e73c5d6a13cac',
// 	{
// 		logging: false,
// 		connectionString: process.env.DATABASE_URL,
// 		dialect: 'postgres',
// 		dialectOptions: {
// 			dateStrings: true,
// 			typeCast: true,
// 			timezone: '+05:30',
// 			ssl: {
// 				require: true,
// 				rejectUnauthorized: false // very important
// 			}
// 		},
// 		timezone: '+05:30',
// 		operatorAliases: false
// 	}
// );

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	protocol: 'postgres',
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}
});

module.exports = sequelize;
