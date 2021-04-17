const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Email = sequelize.define('email', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	email: {
		type: Sequelize.STRING
	},
	name: {
		type: Sequelize.STRING
	},
	text: {
		type: Sequelize.STRING(6553)
	}
});

module.exports = Email;
