const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Post = sequelize.define('post', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING(1234)
	},
	text: {
		type: Sequelize.STRING(6553)
	},
	type: {
		type: Sequelize.STRING
	},
	imageURL: {
		type: Sequelize.STRING
	}
});

module.exports = Post;
