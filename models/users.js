const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	email: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	}
});

module.exports = User;
