const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'password', {
	dialect: 'mysql',
	host: 'localhost'
});

module.exports = sequelize;
